import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 md:px-8">
        <p className="mb-2 md:mb-0">&copy; 2024 Tickets App</p>
        <nav className="flex space-x-4">
          {/* <Link to="/" className="hover:underline">
            Inicio
          </Link>
          <Link to="/about" className="hover:underline">
            Acerca de
          </Link> */}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
