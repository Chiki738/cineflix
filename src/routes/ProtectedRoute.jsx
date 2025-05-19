import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // Si no hay usuario
  if (!user) {
    return <Navigate to="/Login" replace />;
  }

  // Si el rol no está permitido
  if (!allowedRoles.includes(user.rol)) {
    return <Navigate to="/" replace />;
  }

  // Si pasa los chequeos, muestra la ruta hija
  return <Outlet />;
};

export default ProtectedRoute;
