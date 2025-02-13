import { createContext, useState, useEffect } from "react";
import AuthService from "../modules/auth/AuthService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthService.isAuthenticated()
  );

  useEffect(() => {
    setIsAuthenticated(AuthService.isAuthenticated());
  }, []);

  const login = async (email, password) => {
    await AuthService.login(email, password);
    setIsAuthenticated(true);
  };

  const logout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
