import { Outlet, Link } from "react-router";

export function SPAdmin() {
  return (
    <div className="w-64 bg-gray-100 p-4">
      <h2 className="text-lg font-bold">Panel del Administrador</h2>
      <nav>
        <Link
          to="/dashboard/admin/user-management"
          className="block mb-2 text-blue-500 hover:underline"
        >
          Gestión de Usuarios
        </Link>
        <Link
          to="/dashboard/admin/system-settings"
          className="block mb-2 text-blue-500 hover:underline"
        >
          Configuración del Sistema
        </Link>
        <Link
          to="/dashboard/admin/reports"
          className="block mb-2 text-blue-500 hover:underline"
        >
          Reportes
        </Link>
      </nav>
      <Outlet />
    </div>
  );
}
