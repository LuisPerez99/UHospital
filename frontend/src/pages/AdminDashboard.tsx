import { Link, Outlet } from "react-router";

export function AdminDashboard() {
  return (
    <div className="flex">
      <div className="w-64 bg-gray-100 p-4">
        <h2 className="text-lg font-bold">Panel de Administrador</h2>
        <nav className="mt-4">
          <ul>
            <li className="mb-2">
              <Link
                to="user-management"
                className="text-blue-500 hover:underline"
              >
                Gestión de Usuarios
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="system-settings"
                className="text-blue-500 hover:underline"
              >
                Configuración del Sistema
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="reports"
                className="text-blue-500 hover:underline"
              >
                Reportes
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}
