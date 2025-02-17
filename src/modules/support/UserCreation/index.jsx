import { useEffect } from "react";

const UserCreation = () => {
  useEffect(() => {
    document.title = "Creación de Usuarios";
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800">Creación de Usuarios</h2>
    </div>
  );
};

export default UserCreation;
