// AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import AuthService from "../modules/auth/AuthService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(AuthService.getToken());

  const logout = () => {
    AuthService.logout();
    setUser(null);
    setToken(null);
  };

  const updateUserFromToken = () => {
    const currentToken = AuthService.getToken();
    if (currentToken) {
      try {
        const decoded = jwtDecode(currentToken);
        if (decoded.exp * 1000 < Date.now()) {
          console.log("Token expirado, cerrando sesión...");
          logout();
        } else {
          setUser({
            username: decoded.username,
            name: decoded.name,
            role: decoded.role,
          });
        }
      } catch (error) {
        console.error("Error decodificando token:", error);
        logout();
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    updateUserFromToken();
    if (token) {
      const intervalId = setInterval(() => {
        console.log("Verificando token...");
        updateUserFromToken();
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [token]);

  const login = async (username, password) => {
    try {
      const success = await AuthService.login(username, password);
      if (success) {
        const newToken = AuthService.getToken();
        setToken(newToken); // Actualizamos el estado del token para activar el useEffect
        const decoded = jwtDecode(newToken);
        setUser({
          username: decoded.username,
          name: decoded.name,
          role: decoded.role,
        });
      } else {
        throw new Error("Credenciales incorrectas");
      }
    } catch (error) {
      console.log("Error en login:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
