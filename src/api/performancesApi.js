import api from "../api/api";

export const fetchPerformances = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
    throw new Error("No token found");
  }

  try {
    const response = await api.get("http://localhost:3000/performances", {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching performances:", error);
    throw error;
  }
};
