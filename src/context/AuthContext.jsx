import { createContext, useState, useEffect } from "react"; // Importamos createContext, useState y useEffect desde react.
import AuthService from "../modules/auth/AuthService";

export const AuthContext = createContext(); // Se crea el contexto AuthContext, que se usará para compartir el estado de autenticación en la aplicación.

export const AuthProvider = ({ children }) => {
  // Se crea el componente AuthProvider, que se encargará de gestionar el estado de autenticación y proveerlo a los componentes hijos.
  const [user, setUser] = useState(null); // Se define el estado user, que almacenará la información del usuario autenticado.

  useEffect(() => {
    // Se utiliza un efecto de efecto secundario para restaurar el usuario autenticado al cargar la aplicación.
    const token = AuthService.getToken(); // Se obtiene el token de autenticación almacenado en el local storage.
    const storedUser = localStorage.getItem("user"); // Se obtiene el usuario almacenado en el local storage.
    const storedName = localStorage.getItem("name"); // Se obtiene el usuario almacenado en el local storage.
    const storedRole = AuthService.getRole(); // Se obtiene el rol del usuario almacenado en el local storage.

    if (token && storedUser && storedRole && storedName) {
      setUser({ name: storedName, role: storedRole, user: storedUser });
      console.log("AuthProvider - Usuario restaurado:", {
        name: storedName,
        role: storedRole,
        user: storedUser,
      }); // Se establece el usuario autenticado en el estado user si se encuentran los datos necesarios en el local storage.
    } else {
      setUser(null);
      console.log("AuthProvider - No se encontró usuario autenticado.");
      // Si no se encuentran los datos necesarios en el local storage, se establece el estado user a null.
    }
  }, []);

  const login = async (username, password) => {
    // Se define la función login, que se encargará de realizar la autenticación del usuario.
    try {
      await AuthService.login(username, password); // Se llama al método login de AuthService, que realiza la autenticación del usuario.
      setUser({ name: username, role: AuthService.getRole() }); // Si la autenticación es exitosa, se establece el usuario autenticado en el estado user.
    } catch (error) {
      console.error("Error en login:", error); // Si ocurre un error durante la autenticación, se muestra en la consola.
      throw error;
    }
  };

  const logout = () => {
    // Se define la función logout, que se encargará de cerrar la sesión del usuario.
    AuthService.logout(); // Se llama al método logout de AuthService, que elimina el token de autenticación del local storage.
    setUser(null); // Se establece el estado user a null, indicando que no hay usuario autenticado.
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {" "}
      {children}
    </AuthContext.Provider>
  ); // Se provee el estado user, la función login y la función logout a los componentes hijos a través del contexto AuthContext.
};
