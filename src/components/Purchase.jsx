import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { translateStatus } from "../utils/statusTranslations";

import api from "../api/api";
import useAuthStore from "../store/authStore";
import usePerformancesStore from "../store/performancesStore";

export const fetchTicketsByUser = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await api.get(
      "/tickets/user_tickets",
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw error;
  }
};

const Purchase = () => {
  const [tickets, setTickets] = useState([]);
  const [timeLeft, setTimeLeft] = useState(null);

  const { performances, loading, fetchAndSetPerformances } =
    usePerformancesStore();

  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (performances.length === 0) {
      fetchAndSetPerformances();
    }
  }, [performances, fetchAndSetPerformances]);

  useEffect(() => {
    const fetchTickets = async () => {
      if (user) {
        try {
          const data = await fetchTicketsByUser(user.id);
          const ticketsData = data.filter(
            (ticket) => ticket.status === "reserved"
          );
          setTickets(ticketsData);
          if (ticketsData.length > 0) {
            if (!ticketsData[0]?.reserved_until) {
              navigate("/performances");
              return;
            }
            let closestReservedUntil = new Date(ticketsData[0].reserved_until);

            const now = new Date();
            const timeDiff = Math.abs(closestReservedUntil - now);

            setTimeLeft(timeDiff);
          }
        } catch (error) {
          console.error("Error fetching tickets:", error);
        }
      };
    }

    fetchTickets();
  }, [user]);

  useEffect(() => {
    if (timeLeft === null) return;

    if (timeLeft <= 0) {
      toast.error("Tiempo de reserva expirado. Vuelva a seleccionar ticket.");
      navigate("/");
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1000);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTimeLeft = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds}`;
  };

  const [paymentMethod, setPaymentMethod] = useState("creditCard");

  if (loading || performances.length === 0 || tickets.length === 0) {
    return <div>Cargando...</div>;
  }

  const total = tickets.reduce((acc, ticket) => acc + ticket.price, 0);

  const performanceSelected = performances.find(
    (performance) => performance.id === tickets[0].performance_id
  );

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");

      for (const ticket of tickets) {
        await api.post(
          `/tickets/${ticket.id}/purchase`,
          {},
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
      }
      toast.success(
        `Pago realizado con éxito usando ${paymentMethod}. ¡Gracias por tu compra!`
      );
      navigate("/");
    } catch (error) {
      toast.error("Hubo un error al procesar el pago. Inténtalo de nuevo.");
      alert("Hubo un error al procesar el pago. Inténtalo de nuevo.");
    }
  };

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">{performanceSelected.title}</h1>
        <div className="flex flex-row-reverse">
          {timeLeft !== null && (
            <div className="bg-red-500 text-white font-bold py-2 px-4 rounded mb-4 inline-block w-auto">
              {formatTimeLeft(timeLeft)}
            </div>
          )}
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-1">
          <div className="">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="bg-white shadow-md rounded-lg p-4"
                >
                  <h3 className="text-lg font-bold mb-2">
                    Ticket ID: {ticket.id}
                  </h3>
                  <p className="text-gray-700">Precio: ${ticket.price}</p>
                  <p className="text-gray-700">Estado: {translateStatus(ticket.status)}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="bg-blue-300 p-4 rounded-lg shadow-md h-auto">
              <h2 className="text-xl font-bold mb-4">Resumen</h2>
              <p className="text-gray-700 text-lg">
                Subtotal: <span className="font-semibold">${total}</span>
              </p>
              <p className="text-gray-700 text-lg">
                Total: <span className="font-semibold">${total}</span>
              </p>
              <h2 className="text-xl font-bold mb-4">Método de Pago</h2>
              <div className="flex flex-col space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="creditCard"
                    checked={paymentMethod === "creditCard"}
                    onChange={() => setPaymentMethod("creditCard")}
                    className="mr-2"
                  />
                  <span className="text-gray-700">Tarjeta de Crédito</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={() => setPaymentMethod("paypal")}
                    className="mr-2"
                  />
                  <span className="text-gray-700">PayPal</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="bankTransfer"
                    checked={paymentMethod === "bankTransfer"}
                    onChange={() => setPaymentMethod("bankTransfer")}
                    className="mr-2"
                  />
                  <span className="text-gray-700">Transferencia Bancaria</span>
                </label>
              </div>
              <button
                onClick={handlePayment}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
              >
                Realizar Pago
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Purchase;
