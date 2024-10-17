import { useEffect } from "react";

const useWebSocket = (performanceId, setSeats) => {
  useEffect(() => {
    // Access the WebSocket URL from the environment variable
    const wsUrl = import.meta.env.VITE_WEBSOCKET_URL || "ws://localhost:3000/cable";

    if (!wsUrl) {
      console.error("WebSocket URL not defined in environment variables.");
      return;
    }

    const ws = new WebSocket(`${wsUrl}`);

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          command: "subscribe",
          identifier: JSON.stringify({
            channel: "PerformanceChannel",
            performance_id: performanceId,
          }),
        })
      );
    };

    ws.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      if (parsedData.message) {
        const data = parsedData.message;
        if (data.action === "reset") {
          setSeats(data.tickets);
        } else if (["reserve", "purchase", "cancel"].includes(data.action)) {
          const updatedTicket = data.ticket;
          setSeats((prevSeats) =>
            prevSeats.map((seat) =>
              seat.id === updatedTicket.id ? updatedTicket : seat
            )
          );
        }
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      ws.close();
    };
  }, [performanceId, setSeats]);
};

export default useWebSocket;
