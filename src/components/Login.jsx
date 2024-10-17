import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };

    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`;
    console.log("API URL to show:"); // Add this line for debugging
    console.log("API URL:", apiUrl); // Add this line for debugging
    console.log("API URL:", apiUrl); // Add this line for debugging

    try {
      console.log("API URL to show2:"); // Add this line for debugging
      console.log("API URL:", apiUrl); // Add this line for debugging
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`, // Use environment variable for the base URL
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user }),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      const token = response.headers.get("Authorization");
      if (!token) {
        throw new Error("Token not found in response headers");
      }

      login(data.status.data.user, token, data.status.data.user.type);

      navigate("/performances");
      toast.success("Inicio de sesión exitoso!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-8 rounded shadow-md"
    >
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email:
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Contraseña:
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Iniciar Sesión
        </button>
      </div>
      {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
    </form>
  );
};

export default Login;
