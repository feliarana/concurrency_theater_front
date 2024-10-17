import React from "react";

const Home = () => {
  return (
    <main className="bg-blue-600 text-white p-4 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">
        Bienvenido al sistema de venta de tickets para la demo de Programación Concurrente.
      </h1>
      <p className="text-lg mb-8">
        Desarrollado por Felipe Arana. 
        <br/>Frameworks utilizados: React + Vite con PWA y Websockets.
        <br/>Backend: Ruby On Rails.
      </p>
    </main>
  );
};

export default Home;
