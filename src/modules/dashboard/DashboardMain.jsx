const DashboardMain = ({ user }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800">
        ¡Bienvenido, {user?.name || "Usuario"}!
      </h2>
      <p className="mt-2 text-gray-600">
        Tu rol: <span className="font-semibold">{user?.role}</span>
      </p>
      <div className="mt-6 grid grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-700">
            Acceso rápido a herramientas más usadas
          </h3>
          <p className="text-gray-500">Creación de Usuarios.</p>
          <p className="text-gray-500">Dar Permisos, etc.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-700">
            Indicadores de actividad
          </h3>
          <p className="text-gray-500">Permisos otorgados recientemente.</p>
          <p className="text-gray-500">Últimos cambios en pruebas.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-700">
            Notificaciones Recientes
          </h3>
          <p className="text-gray-500">Errores en pruebas.</p>
          <p className="text-gray-500">Cambios en producción.</p>
          <p className="text-gray-500">Alertas de seguridad.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-700">
            Acceso a documentación o ayuda interna
          </h3>
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
