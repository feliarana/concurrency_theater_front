import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import usePerformancesStore from "../store/performancesStore";
import {
  fetchPerformancesSeats,
  reserveSeat,
  cancelReservation,
} from "../api/tickets";
import useAuthStore from "../store/authStore";
import useWebSocket from "../hooks/useWebSocket";
import { translateStatus } from "../utils/statusTranslations";

const Seats = () => {
  const { performanceId } = useParams();
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [performance, setPerformance] = useState(null);
  const currentUser = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  // Extraer tanto el estado como las acciones del store
  const { performances, loading: performancesLoading, fetchAndSetPerformances } =
    usePerformancesStore();

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchAndSetPerformances();
        const data = await fetchPerformancesSeats();
        setSeats(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [fetchAndSetPerformances]);

  useEffect(() => {
    const current = performances.find(
      (p) => p.id === parseInt(performanceId, 10)
    );
    setPerformance(current);
  }, [performances, performanceId]);

  useWebSocket(performanceId, setSeats);

  if (loading || performancesLoading) {
    return <div>Cargando...</div>;
  }

  const filterSeatsByPerformanceId = (seats, performanceId) => {
    return seats.filter((seat) => seat.performance_id === performanceId);
  };

  const availableSeats = filterSeatsByPerformanceId(
    seats,
    parseInt(performanceId, 10)
  );

  const hasReservedTickets = availableSeats.some(
    (seat) => seat.status === "reserved" && seat.user_id === currentUser.id
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-100";
      case "cancelled":
        return "bg-red-100";
      case "reserved":
        return "bg-yellow-100";
      case "purchased":
        return "bg-blue-100";
      default:
        return "bg-gray-100";
    }
  };

  const handleReserve = async (seatId) => {
    try {
      const reservedSeat = await reserveSeat(seatId);
      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          seat.id === reservedSeat.id ? reservedSeat : seat
        )
      );
      toast.success("Ticket reservado exitosamente!");
    } catch (error) {
      console.error("Error reserving seat:", error);
    }
  };

  const handleCancel = async (seatId) => {
    try {
      const canceledSeat = await cancelReservation(seatId);
      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          seat.id === canceledSeat.id ? canceledSeat : seat
        )
      );
      toast.success("Reserva cancelada exitosamente!");
    } catch (error) {
      console.error("Error canceling seat:", error);
    }
  };

  const handlePurchase = () => {
    navigate("/purchase");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Asientos Disponibles para{" "}
        <span className="text-blue-600">
          {performance ? performance.title : "..."}
        </span>
      </h1>
      <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-1">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {availableSeats.map((seat) => {
            const isUnavailable =
              seat.status === "purchased" || seat.status === "cancelled";
            return (
              <li
                key={seat.id}
                className={`${isUnavailable ? "bg-gray-300" : getStatusColor(seat.status)
                  } shadow-md rounded-lg p-4 hover:bg-gray-200 transition duration-300`}
              >
                <div className="text-lg font-semibold">Asiento #{seat.id}</div>
                <div className="text-gray-600">Precio: ${seat.price}</div>
                <div className="text-gray-600">
                  Estado: {isUnavailable ? "no disponible" : translateStatus(seat.status)}
                </div>
                {seat.status === "available" && (
                  <button
                    onClick={() => handleReserve(seat.id)}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Reservar
                  </button>
                )}
                {seat.status === "reserved" &&
                  seat.user_id === currentUser.id && (
                    <button
                      onClick={() => handleCancel(seat.id)}
                      className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Cancelar Reserva
                    </button>
                  )}
              </li>
            );
          })}
        </ul>
        <div className="fixed bottom-4 right-4 z-10">
          <button
            onClick={handlePurchase}
            className={`bg-blue-500 text-white py-2 px-4 rounded shadow-lg hover:bg-blue-700 transition duration-300 ${!hasReservedTickets ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={!hasReservedTickets}
          >
            Comprar Tickets Reservados
          </button>
        </div>
      </div>
    </div>
  );
};

export default Seats;