// TokenExpirationAlert.jsx
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

const TokenExpirationAlert = () => {
  const { token } = useContext(AuthContext);
  const [showAlert, setShowAlert] = useState(false);
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    // Solo se inicia el intervalo si hay token y tiene la propiedad exp
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setDecodedToken(decoded);
      } catch (error) {
        console.error("Error decodificando token:", error);
      }
    }
  }, [token]);

  useEffect(() => {
    if (decodedToken && decodedToken.exp) {
      const interval = setInterval(() => {
        const currentTime = Math.floor(Date.now() / 1000);
        const secondsLeft = decodedToken.exp - currentTime;
        if (secondsLeft <= 10 && secondsLeft > 0) {
          setShowAlert(true);
        } else {
          setShowAlert(false);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [decodedToken]);

  if (!showAlert) return null;

  return (
    <div className="fixed top-0 w-full bg-red-600 text-white text-center p-2 z-50">
      Atención: ¡Tu sesión expirará en menos de 10 segundos!
    </div>
  );
};

export default TokenExpirationAlert;
