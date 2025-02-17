const AuthService = {
  // Se define el objeto AuthService, que contendrá los métodos para gestionar la autenticación del usuario.
  login: async (user, password) => {
    // Se define el método login, que recibe el usuario y la contraseña como parámetros.
    try {
      console.log("AuthService - Intentando login con:", user);

      // Cargar el JSON correctamente desde public/data
      const response = await fetch("/data/users.json"); // Se realiza una petición fetch para obtener la lista de usuarios.
      if (!response.ok) throw new Error("Error al cargar usuarios"); // Si la respuesta no es exitosa, se lanza un error.

      const users = await response.json(); // Se obtiene la lista de usuarios en formato JSON.

      // Buscar el usuario en la lista
      const foundUser = users.find(
        (u) => u.user === user && u.password === password
      );

      if (foundUser) {
        // Si se encuentra el usuario en la lista y la contraseña coincide, se inicia sesión.
        localStorage.setItem("token", "fake-jwt-token"); // Se almacena un token de autenticación en el local storage.
        localStorage.setItem("name", foundUser.name); // Se almacena el nombre de usuario en el local storage.
        localStorage.setItem("role", foundUser.role); // Se almacena el rol del usuario en el local storage.
        localStorage.setItem("user", foundUser.user); // Se almacena el usuario del usuario en el local storage.
        console.log("AuthService - Login exitoso:", foundUser); // Se muestra un mensaje en la consola indicando que el login fue exitoso.
        return true; // Se retorna true para indicar que la autenticación fue exitosa.
      } else {
        console.log("AuthService - Credenciales incorrectas"); // Si no se encuentra el usuario o la contraseña no coincide, se muestra un mensaje en la consola.
        // throw new Error("Credenciales incorrectas"); // Se lanza un error indicando que las credenciales son incorrectas.
      }
    } catch (error) {
      console.error("AuthService - Error en autenticación:", error); // Si ocurre un error durante la autenticación, se muestra en la consola.
      // throw new Error("Error al iniciar sesión"); // Se lanza un error genérico indicando que hubo un error al iniciar sesión.
    }
  },

  logout: () => {
    // Se define el método logout, que se encargará de cerrar la sesión del usuario
    console.log("AuthService - Cerrando sesión..."); // Se muestra un mensaje en la consola indicando que se está cerrando la sesión.
    localStorage.removeItem("token"); // Se elimina el token de autenticación del local storage.
    localStorage.removeItem("user"); // Se elimina el nombre de usuario del local storage.
    localStorage.removeItem("role"); // Se elimina el rol del usuario del local storage.
  },

  getToken: () => localStorage.getItem("token"), // Se define el método getToken, que devuelve el token de autenticación almacenado en el local storage.

  getRole: () => localStorage.getItem("role") || "usuario", // Se define el método getRole, que devuelve el rol del usuario almacenado en el local storage o "usuario" por defecto

  isAuthenticated: () => !!localStorage.getItem("token"), // Se define el método isAuthenticated, que devuelve true si hay un token de autenticación almacenado en el local storage, o false en caso contrario.
};

export default AuthService;
