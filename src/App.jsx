// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginInterno from "./modules/auth/LoginInterno";
import Dashboard from "./modules/dashboard/Dashboard";
import SupportRoutes from "./routes/SupportRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import PrivateLayout from "./routes/PrivateLayout";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Redirige la raíz a login o dashboard en función del estado del usuario */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginInterno />} />
          <Route element={<PrivateRoutes />}>
            <Route element={<PrivateLayout />}>
              <Route path="/dashboard/*" element={<Dashboard />} />
              <Route path="/support/*" element={<SupportRoutes />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
