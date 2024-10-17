import React from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Header = () => {
  const loggedIn = useAuthStore((state) => state.loggedIn);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <header className="bg-blue-950 text-white p-4 flex flex-col md:flex-row md:justify-between md:items-center">
      <div className="mb-2 md:mb-0 w-40">Tickets App</div>
      <nav className="flex w-full flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col content-center md:flex-row md:items-center">
          <Link
            to="/"
            className="mb-2 md:mb-0 md:mr-4 relative inline-block hover:text-yellow-300 text-lg transition-colors duration-200 hover:underline"
          >
            Inicio
          </Link>
          <Link
            to="/performances"
            className="mb-2 md:mb-0 md:mr-4 hover:underline"
          >
            Obras disponibles
          </Link>
        </div>
        {loggedIn ? (
          <div className="flex flex-col content-center md:flex-row md:items-center">
            <span className="mb-2 md:mb-0 md:mr-4">
              Bienvenido, {user?.name}
            </span>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <Link to="/login" className="hover:underline">
            Iniciar Sesión
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
