import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import Header from "./components/Header";
import Performances from "./components/Performances";
import Seats from "./components/Seats";
import PrivateRoute from "./components/PrivateRoute";
import "./styles.css";
import Home from "./components/Home";
import Login from "./components/Login";
import useAuthStore from "./store/authStore";
import Purchase from "./components/Purchase";
import Footer from "./components/Footer";

function App() {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div className="container mx-auto bg-gray-100 min-h-screen flex flex-col">
      <Router basename="/">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/performances" element={<Performances />} />
            <Route
              path="/seats/:performanceId"
              element={<PrivateRoute component={Seats} />}
            />
            <Route
              path="/purchase"
              element={<PrivateRoute component={Purchase} />}
            />
            <Route path="*" element={<div>NOT FOUND</div>} />
          </Routes>
        </div>
        <Footer />
      </Router>
      <Toaster richColors position="top-right" />
    </div>
  );
}

export default App;
