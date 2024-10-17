import React, { useEffect, useState } from "react";
import api from "../api/api";

const Reset = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const reset = async () => {
      try {
        const response = await api.post("/tickets/reset");
        setMessage("OK");
      } catch (error) {
        setMessage("Error resetting: " + error.message);
      }
    };
    reset();
  }, []);

  return (
    <div>
      <p>{message}</p>
    </div>
  );
};

export default Reset;