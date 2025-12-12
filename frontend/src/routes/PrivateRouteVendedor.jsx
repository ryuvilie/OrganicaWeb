import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const PrivateRouteVendedor = ({ children }) => {
  const { usuario } = useUser();

  if (!usuario) {
    return <Navigate to="/registro" replace />;
  }

  if (usuario.rol !== "VENDEDOR" && usuario.rol !== "ADMIN") {
    return <Navigate to="/403" replace />;
  }

  return children;
};

export default PrivateRouteVendedor;
