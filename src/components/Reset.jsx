import React, { useEffect, useState } from "react";
import api from "../api/api";
import useAuthStore from "../store/authStore";

const Reset = () => {
  const user = useAuthStore((state) => state.user);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const reset = async () => {
      try {
        const token = localStorage.getItem("token");
        await api.post(`/tickets/reset`,
          {},
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setMessage("OK");
      } catch (error) {
        setMessage("Error resetting: " + error.message);
      }
    };
    reset();
  }, [user]);

  return (
    <div>
      <p>{message}</p>
    </div>
  );
};

export default Reset;