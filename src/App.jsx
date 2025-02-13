import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginInterno from "./modules/auth/LoginInterno";
import Dashboard from "./modules/dashboard/Dashboard";
import PrivateRoutes from "./routes/PrivateRoutes";
/* import Dashboard from "./modules/dashboard/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import FinanceRoutes from "./routes/FinanceRoutes";
import AccountingRoutes from "./routes/AccountingRoutes";
import HrRoutes from "./routes/HrRoutes";
import SupportRoutes from "./routes/SupportRoutes";*/

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginInterno />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />

          {/*
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/finance/*"
          element={
            <PrivateRoute>
              <FinanceRoutes />
            </PrivateRoute>
          }
        />

        <Route
          path="/accounting/*"
          element={
            <PrivateRoute>
              <AccountingRoutes />
            </PrivateRoute>
          }
        />

        <Route
          path="/hr/*"
          element={
            <PrivateRoute>
              <HrRoutes />
            </PrivateRoute>
          }
        />

        <Route
          path="/support/*"
          element={
            <PrivateRoute>
              <SupportRoutes />
            </PrivateRoute>
          }
        /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
