import { Outlet } from "react-router";
import { Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export function DoctorDashboard() {
  const { user } = useAuth();

  return (
    <div className="flex">
      <div className="w-64 bg-gray-100 p-4 rounded-lg shadow-md mt-4 ml-4 mb-4">
        <h2 className="text-lg font-bold">Panel de Doctor</h2>
        <nav>
          <Link
            to="gestion-usuarios"
            className="bg-gray-200 hover:cursor-pointer hover:bg-gray-300 p-4 rounded-md block shadow-sm mb-2"
          >
            Gestión de Usuarios
          </Link>
          <Link
            to="registro"
            className="bg-gray-200 hover:cursor-pointer hover:bg-gray-300 p-4 rounded-md block shadow-sm mb-2"
          >
            Registrar Usuarios
          </Link>
          <Link
            to="reportes"
            className="bg-gray-200 hover:cursor-pointer hover:bg-gray-300 p-4 rounded-md block shadow-sm mb-2"
          >
            Reportes
          </Link>
        </nav>
        <div className="mt-4 text-sm text-gray-600">
          Conectado como: {user?.username}
        </div>
      </div>
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  )
}
