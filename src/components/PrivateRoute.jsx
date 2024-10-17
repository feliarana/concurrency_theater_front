import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const PrivateRoute = ({ component: Component }) => {
  const loggedIn = useAuthStore((state) => state.loggedIn);

  return loggedIn ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
