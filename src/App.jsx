import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginInterno from "./modules/auth/LoginInterno";
import Dashboard from "./modules/dashboard/Dashboard";
import SupportRoutes from "./routes/SupportRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginInterno />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/support/*" element={<SupportRoutes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
