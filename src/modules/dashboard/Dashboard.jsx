import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext); // Obtener usuario autenticado
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        Bienvenido, {user?.name || "Usuario"} 👋
      </h1>
      <p className="text-gray-600">Accede a las herramientas internas:</p>

      {/* Notificaciones internas */}
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 my-4">
        <p>
          🔔 Mantenimiento programado el viernes 16 de febrero a las 10:00 AM.
        </p>
      </div>

      {/* Menú de navegación basado en roles */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Link
          to="/finance"
          className="bg-blue-500 text-white p-4 rounded text-center"
        >
          Finanzas
        </Link>
        <Link
          to="/accounting"
          className="bg-green-500 text-white p-4 rounded text-center"
        >
          Contabilidad
        </Link>
        {user?.role === "admin" || user?.role === "rrhh" ? (
          <Link
            to="/hr"
            className="bg-yellow-500 text-white p-4 rounded text-center"
          >
            Recursos Humanos
          </Link>
        ) : null}
        {user?.role === "admin" || user?.role === "soporte" ? (
          <Link
            to="/support"
            className="bg-red-500 text-white p-4 rounded text-center"
          >
            Soporte Técnico
          </Link>
        ) : null}
      </div>

      {/* Botón de logout */}
      <button
        onClick={handleLogout}
        className="mt-6 bg-gray-800 text-white px-4 py-2 rounded"
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Dashboard;
