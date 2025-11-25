import { Link, Outlet } from "react-router";
import type { User, Paciente, Doctor, Admin } from "../models/models";

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
                to="/register"
                className="text-blue-500 hover:underline"
              >
                Registrar Usuarios
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
        <Outlet context={{ users, setUsers, pacientes, setPacientes, doctors, setDoctors, admins, setAdmins }} />
      </div>
    </div>
  );
}
