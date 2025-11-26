import { useAuth } from "../contexts/AuthContext";
import { Link, Outlet } from "react-router";

export function PacienteDashboard() {
  const { user } = useAuth();

  return (
    <div className="flex">
      <div className="w-64 bg-gray-100 p-4 rounded-lg shadow-md mt-4 ml-4 mb-4">
        <h2 className="text-lg font-bold">Panel del Paciente</h2>
        <nav>
          <Link
            to="/dashboard/paciente/appointments"
            className="bg-gray-200 hover:cursor-pointer hover:bg-gray-300 p-4 rounded-md block shadow-sm mb-2"
          >
            Mis Citas
          </Link>
          <Link
            to="/dashboard/paciente/medical-records"
            className="bg-gray-200 hover:cursor-pointer hover:bg-gray-300 p-4 rounded-md block shadow-sm mb-2"
          >
            Mi Historial Médico
          </Link>
          <Link
            to="/dashboard/paciente/profile"
            className="bg-gray-200 hover:cursor-pointer hover:bg-gray-300 p-4 rounded-md block shadow-sm mb-2"
          >
            Mi Perfil
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
  );
}
