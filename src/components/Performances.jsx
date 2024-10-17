import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import usePerformancesStore from "../store/performancesStore";

const Performances = () => {
  const { performances, loading, fetchAndSetPerformances } =
    usePerformancesStore();

  useEffect(() => {
    if (performances.length === 0) {
      fetchAndSetPerformances();
    }
  }, [performances, fetchAndSetPerformances]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Listado de Performances</h1>
      <ul className="space-y-4">
        {performances.map((performance) => (
          <li
            key={performance.id}
            className="bg-white shadow-md rounded-lg p-4 hover:bg-gray-100 transition duration-300"
          >
            <Link
              to={`/seats/${performance.id}`}
              className="text-lg font-semibold text-blue-600 hover:underline"
            >
              {performance.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Performances;
