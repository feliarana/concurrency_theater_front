import React from "react";

const Home = () => {
  return (
    <main className="bg-blue-600 text-white p-4 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">
        Bienvenido a la Página de Inicio
      </h1>
      <p className="text-lg mb-8">
        Esta es una página de inicio de ejemplo utilizando Tailwind CSS.
      </p>
      <button className="bg-white text-blue-600 font-semibold py-2 px-4 rounded hover:bg-gray-200">
        Aprende más
      </button>
    </main>
  );
};

export default Home;
