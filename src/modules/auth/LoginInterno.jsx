// LoginInterno.jsx
import { useState, useContext } from "react"; // Hooks que nos permiten manejar el estado y acceder a contextos respectivamente.
import { useNavigate } from "react-router-dom"; // Hook que nos permite redirigir o navegar programáticamente entre rutas.
import { AuthContext } from "../../context/AuthContext";

const LoginInterno = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext); // Obtenemos la función login del AuthContext.
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    // Se define una función asíncrona que se ejecutará cuando se intente iniciar sesión
    e.preventDefault(); // para evitar que el formulario se recargue al enviar, permitiendo manejar el evento de forma personalizada.
    setError(""); // Se limpia cualquier mensaje de error previo estableciendo el estado error a una cadena vacía.

    try {
      await login(username, password); // Se llama a la función login pasando el usuario y la contraseña.
      navigate("/dashboard"); // Si la autenticación fue exitosa, se utiliza navigate para redirigir al usuario a la ruta /dashboard.
    } catch (err) {
      setError(" Credenciales incorrectas"); // Si la autenticación falla, se establece un mensaje de error en el estado error.
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Iniciar Sesión
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginInterno;
