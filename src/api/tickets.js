import api from "../api/api";

export const fetchPerformancesSeats = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  try {
    const response = await api.get("http://localhost:3000/tickets", {
      headers: { Authorization: `${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw error;
  }
};

export const reserveSeat = async (seatId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  try {
    const response = await api.post(
      `http://localhost:3000/tickets/${seatId}/reserve`,
      {},
      { headers: { Authorization: `${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error reserving seat:", error);
    throw error;
  }
};

export const cancelReservation = async (seatId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  try {
    const response = await api.post(
      `http://localhost:3000/tickets/${seatId}/cancel`,
      {},
      { headers: { Authorization: `${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error canceling reservation:", error);
    throw error;
  }
};
