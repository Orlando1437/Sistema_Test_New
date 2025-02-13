import { Navigate, Outlet } from "react-router-dom";
import AuthService from "../modules/auth/AuthService";

const PrivateRoutes = () => {
  return AuthService.isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
