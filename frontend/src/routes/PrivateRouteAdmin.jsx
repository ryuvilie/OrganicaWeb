// src/routes/PrivateRouteAdmin.jsx
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function PrivateRouteAdmin({ children }) {
  const { usuario, isAdmin } = useUser();

  // Si no está autenticado → ir al login/registro
  if (!usuario) {
    return <Navigate to="/registro" replace />;
  }

  // Si está autenticado pero no es admin → mostrar página 403
  if (!isAdmin) {
    return <Navigate to="/403" replace />;
  }

  // Si es admin → mostrar lo que pidió
  return children;
}
