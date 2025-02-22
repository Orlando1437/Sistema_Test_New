// PrivateLayout.jsx
import { Outlet } from "react-router-dom";
import TokenExpirationAlert from "./TokenExpirationAlert";

const PrivateLayout = () => {
  return (
    <div>
      <TokenExpirationAlert />
      <Outlet />
    </div>
  );
};

export default PrivateLayout;
