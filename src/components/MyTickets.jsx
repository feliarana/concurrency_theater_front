import React, { useState, useEffect } from 'react';
import { fetchTicketsByUser } from "../api/tickets";
import { translateStatus } from "../utils/statusTranslations";
import useAuthStore from "../store/authStore";

const MyTickets = () => {
  const [myTickets, setMyTickets] = useState([]);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTicketsByUser(user.id);
        const purchasedTickets = data.filter((ticket) => ticket.status === "purchased");
        setMyTickets(purchasedTickets);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>{myTickets.length === 0 ? "No tienes tickets comprados" : "Mis Tickets Comprados"}</h1>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {myTickets.map((ticket) => (
          <li key={ticket.id} style={{ backgroundColor: '#f9f9f9', padding: 10, margin: 10, border: '1px solid #ddd', borderRadius: 5 }}>
            <h2 style={{ fontSize: 16, fontWeight: 'bold' }}>{ticket.performance.title}</h2>
            <p style={{ fontSize: 14, color: '#666' }}>Fecha: {ticket.date} | Precio: {ticket.price}</p>
            <p style={{ fontSize: 14, color: '#666' }}>Estado: {translateStatus(ticket.status)}</p>
            <p style={{ fontSize: 14, color: '#666' }}>A nombre de: {ticket.user.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyTickets;