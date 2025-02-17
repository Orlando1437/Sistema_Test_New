import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { NavLink, Routes, Route, useNavigate } from "react-router-dom";

import DashboardMain from "./DashboardMain";
import Support from "../support/Support";
import Finance from "../finance/Finance";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { to: "/dashboard", label: "Inicio" },
    { to: "/dashboard/support", label: "Herramientas de Sistemas" },
    { to: "/dashboard/finance", label: "Finanzas" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Menú lateral */}
      <aside className="w-64 bg-blue-800 text-white p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold">Sistemas Deltron</h1>
          <nav className="mt-6 space-y-3">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `w-full h-12 text-left px-3 flex items-center rounded-lg ${
                    isActive ? "bg-blue-700" : "hover:bg-blue-600"
                  }`
                }
                end
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 p-2 rounded-lg hover:bg-red-600"
        >
          Cerrar Sesión
        </button>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-10">
        <Routes>
          <Route path="*" element={<DashboardMain user={user} />} />
          <Route path="support" element={<Support />} />
          <Route path="finance" element={<Finance />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
