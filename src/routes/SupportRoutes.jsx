// SupportRoutes.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import UserCreation from "../modules/support/UserCreation/index";

const SupportRoutes = () => {
  return (
    <Routes>
      <Route path="userCreation" element={<UserCreation />} />
      {/* Agregar más herramientas si es necesario */}
    </Routes>
  );
};

export default SupportRoutes;
