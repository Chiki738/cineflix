import { Navigate, Outlet } from "react-router-dom";
import { getStoredUser } from "../utils/storage";

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const user = getStoredUser();

  if (!user) {
    return <Navigate to="/Login" replace />;
  }

  if (!allowedRoles.includes(user.rol)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
