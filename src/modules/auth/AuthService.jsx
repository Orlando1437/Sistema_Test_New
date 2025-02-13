const AuthService = {
  login: async (email, password) => {
    // Simulación de API (deberías hacer una petición real con fetch o axios)
    if (email === "admin@example.com" && password === "123456") {
      const token = "fake-jwt-token"; // Aquí recibirías un token real
      localStorage.setItem("token", token);
      return true;
    } else {
      throw new Error("Credenciales incorrectas");
    }
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },
};

export default AuthService;
