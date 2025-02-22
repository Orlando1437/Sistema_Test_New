// AuthService.jsx
import { jwtDecode } from "jwt-decode";

const AuthService = {
  // Se define el objeto AuthService, que contendrá los métodos para gestionar la autenticación del usuario.
  login: async (username, password) => {
    // Se define el método login, que recibe el usuario y la contraseña como parámetros.
    try {
      console.log("AuthService - Intentando login con:", username);

      // Cargar el JSON correctamente desde public/data
      const response = await fetch(
        "http://localhost/prac/PHP/sistemaNewTest/login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username, password: password }),
        }
      ); // Se realiza una petición fetch para obtener la lista de usuarios.

      const data = await response.json(); // Se obtiene la lista de usuarios en formato JSON.

      if (data.success) {
        // Guarda el token en localStorage
        localStorage.setItem("token", data.token);

        // Decodifica el token para extraer la información del usuario
        const decoded = jwtDecode(data.token);

        // Opcionalmente guarda otros datos en localStorage si lo deseas:
        localStorage.setItem("user", decoded.username);
        localStorage.setItem("name", decoded.name);
        localStorage.setItem("role", decoded.role);

        console.log("Login exitoso:", decoded);
        return true;
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Error en autenticación:", error);
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    console.log("Sesión cerrada");
  },

  getToken: () => localStorage.getItem("token"), // Se define el método getToken, que devuelve el token de autenticación almacenado en el local storage.

  getRole: () => localStorage.getItem("role") || "usuario", // Se define el método getRole, que devuelve el rol del usuario almacenado en el local storage o "usuario" por defecto

  isAuthenticated: () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        // Token expirado
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }, // Se define el método isAuthenticated, que devuelve true si hay un token de autenticación almacenado en el local storage, o false en caso contrario.
};

export default AuthService;
