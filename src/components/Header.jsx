import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Header = () => {
  const loggedIn = useAuthStore((state) => state.loggedIn);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-blue-950 text-white p-4 flex flex-col md:flex-row md:items-center">
      <div className="flex-none">
        <span className="text-xl font-bold">Tickets App</span>
      </div>
      <div className="flex-1 md:flex md:justify-end">
        <nav
          className={`flex w-full flex-col md:flex-row md:items-center md:justify-end ${
            menuOpen ? "block" : "hidden"
          } md:block md:ml-20`}
        >
          <div className="md:flex md:items-center md:space-x-8">
            <Link
              to="/"
              className="block md:inline-block hover:text-yellow-300 text-lg transition-colors duration-200 hover:underline mb-2 md:mb-0"
            >
              Inicio
            </Link>
            {loggedIn && (
              <>
                <Link
                  to="/performances"
                  className="block md:inline-block hover:underline mb-2 md:mb-0"
                >
                  Obras disponibles
                </Link>
                <Link
                  to="/my-tickets"
                  className="block md:inline-block hover:underline mb-2 md:mb-0"
                >
                  Mis Tickets Comprados
                </Link>
              </>
            )}
            {loggedIn ? (
              <div className="flex flex-col md:flex-row md:items-center">
                <span className="mr-4">
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
          </div>
        </nav>
        <button
          className="md:hidden absolute top-4 right-4"
          onClick={handleMenuToggle}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;