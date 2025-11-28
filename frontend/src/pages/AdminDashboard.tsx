import { Link, Outlet } from "react-router";
import type { User, Paciente, Doctor, Admin } from "../models/models";
import { useAuth } from "../contexts/AuthContext";

interface AdminDashboardProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  pacientes: Paciente[];
  setPacientes: React.Dispatch<React.SetStateAction<Paciente[]>>;
  doctors: Doctor[];
  setDoctors: React.Dispatch<React.SetStateAction<Doctor[]>>;
  admins: Admin[];
  setAdmins: React.Dispatch<React.SetStateAction<Admin[]>>;
}

export function AdminDashboard({
  users,
  setUsers,
  pacientes,
  setPacientes,
  doctors,
  setDoctors,
  admins,
  setAdmins,
}: AdminDashboardProps) {
  const { user } = useAuth();
  return (
    <div className="flex">
      <div className="w-64 bg-gray-100 p-4 rounded-lg shadow-md mt-4 ml-4 mb-4">
        <h2 className="text-lg font-bold">Panel de Administrador</h2>
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
        <Outlet context={{ users, setUsers, pacientes, setPacientes, doctors, setDoctors, admins, setAdmins }} />
      </div>
    </div>
  );
}
