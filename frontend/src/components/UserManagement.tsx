import { useState } from "react";
import { useOutletContext } from "react-router";
import { BsPencilFill, BsTrashFill, BsEyeFill } from "react-icons/bs";
import type {
  Admin,
  Doctor,
  Paciente,
  User,
  ExtendedUser,
} from "../models/models";
import { EditUserModal } from "./EditUserModal";
import { ViewUserModal } from "./ViewUserModal";
import { useAuth } from "../contexts/AuthContext";

interface UserManagementContext {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  pacientes: Paciente[];
  setPacientes: React.Dispatch<React.SetStateAction<Paciente[]>>;
  doctors: Doctor[];
  setDoctors: React.Dispatch<React.SetStateAction<Doctor[]>>;
  admins: Admin[];
  setAdmins: React.Dispatch<React.SetStateAction<Admin[]>>;
}

export function UserManagement() {
  const {
    users: data,
    setUsers: setData,
    pacientes: pacientesData,
    setPacientes: setPacientesData,
    doctors: doctorsData,
    setDoctors: setDoctorsData,
    admins: adminsData,
    setAdmins: setAdminsData,
  } = useOutletContext<UserManagementContext>();
  const [filter, setFilter] = useState("all");
  const [editingUser, setEditingUser] = useState<ExtendedUser | null>(null);
  const [viewingUser, setViewingUser] = useState<User | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const handleActiveFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setActiveFilter(e.target.value);
  };

  const { user } = useAuth();

  const buildExtendedUser = (
    user: User,
    admins: Admin[],
    doctors: Doctor[],
    pacientes: Paciente[]
  ): ExtendedUser => {
    switch (user.role) {
      case "ADMIN":
        const admin = admins.find((a) => a.email === user.email);
        return { ...user, ...(admin || {}) };
      case "DOCTOR":
        const doctor = doctors.find((d) => d.email === user.email);
        return { ...user, ...(doctor || {}) };
      case "PACIENTE":
        const paciente = pacientes.find((p) => p.email === user.email);
        return { ...user, ...(paciente || {}) };
      default:
        return user;
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  let filteredUsers = data;
  if (filter !== "all") {
    filteredUsers = filteredUsers.filter(
      (user) => user.role.toLowerCase() === filter
    );
  }
  if (activeFilter !== "all") {
    filteredUsers = filteredUsers.filter((user) =>
      activeFilter === "active" ? user.active : !user.active
    );
  }

  const handleSaveUser = (updated: ExtendedUser) => {
    setData((prev) =>
      prev.map((user) =>
        user.id === updated.id
          ? { ...user, username: updated.username, email: updated.email }
          : user
      )
    );

    switch (updated.role) {
      case "ADMIN":
        setAdminsData((prev) =>
          prev.map((admin) =>
            admin.email === updated.email
              ? {
                  ...admin,
                  nombre: updated.nombre || "",
                  apellido: updated.apellido || "",
                  telefono: updated.telefono || "",
                  fecha_nacimiento: updated.fechaNacimiento || "",
                  genero: updated.genero || "",
                  direccion: updated.direccion || "",
                }
              : admin
          )
        );
        break;
      case "DOCTOR":
        setDoctorsData((prev) =>
          prev.map((doctor) =>
            doctor.email === updated.email
              ? {
                  ...doctor,
                  nombre: updated.nombre || "",
                  apellido: updated.apellido || "",
                  especialidad: updated.especialidad || "",
                  telefono: updated.telefono || "",
                  fecha_nacimiento: updated.fechaNacimiento || "",
                  genero: updated.genero || "",
                  direccion: updated.direccion || "",
                }
              : doctor
          )
        );
        break;
      case "PACIENTE":
        setPacientesData((prev) =>
          prev.map((paciente) =>
            paciente.email === updated.email
              ? {
                  ...paciente,
                  nombre: updated.nombre || "",
                  apellido: updated.apellido || "",
                  telefono: updated.telefono || "",
                  fecha_nacimiento: updated.fechaNacimiento || "",
                  genero: updated.genero || "",
                  direccion: updated.direccion || "",
                }
              : paciente
          )
        );
        break;
    }

    if (user && user.id === updated.id) {
      user.username = updated.username;
      user.email = updated.email;
    }

    setEditingUser(null);
  };

  const handleActiveToggle = (userId: number) => {
    setData((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, active: !(user.active ?? false) } : user
      )
    );
  };

  return (
    <>
      <div className="w-fit bg-gray-100 p-4 rounded-lg shadow-md mb-4">
        <h2 className="text-lg font-bold">Gestión de Usuarios</h2>
        <div className="mb-4 flex gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="userFilter">
              Filtrar por rol de usuario
            </label>
            <select
              id="userFilter"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              value={filter}
              onChange={handleFilterChange}
            >
              <option value="all">Todos</option>
              <option value="admin">Administradores</option>
              <option value="doctor">Doctores</option>
              <option value="paciente">Pacientes</option>
            </select>
          </div>
          <div className="mb-4 px-4">
            <label className="block text-gray-700 mb-2" htmlFor="activeFilter">
              Filtrar por estado activo
            </label>
            <select
              id="activeFilter"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              value={activeFilter}
              onChange={handleActiveFilterChange}
            >
              <option value="all">Todos</option>
              <option value="active">Activos</option>
              <option value="inactive">Inactivos</option>
            </select>
          </div>
        </div>
      </div>
      {/* Renderizar lista de usuarios como tabla */}
      <div className="flex-1 p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Lista de Usuarios</h3>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="border border-gray-300 bg-gray-200 px-4 py-2">
                ID
              </th>
              <th className="border border-gray-300 bg-gray-200 px-4 py-2">
                Nombre de Usuario
              </th>
              <th className="border border-gray-300 bg-gray-200 px-4 py-2">
                Correo Electrónico
              </th>
              <th className="border border-gray-300 bg-gray-200 px-4 py-2">
                Rol
              </th>
              <th className="border border-gray-300 bg-gray-200 px-4 py-2 text-center">
                Acciones
              </th>
              <th className="border border-gray-300 bg-gray-200 px-4 py-2 text-center">
                Activo
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user: User) => (
              <tr key={user.id}>
                <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.username}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.role}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center align-middle">
                  <div className="inline-flex items-center gap-2">
                    <button
                      className="text-white bg-green-500 hover:bg-green-600 p-2"
                      title="Editar Usuario"
                      onClick={() =>
                        setEditingUser(
                          buildExtendedUser(
                            user,
                            adminsData,
                            doctorsData,
                            pacientesData
                          )
                        )
                      }
                    >
                      <BsPencilFill />
                    </button>
                    <button
                      className="text-white bg-red-500 hover:bg-red-600 p-2"
                      title="Eliminar Usuario"
                      onClick={() =>
                        setData((prev) => prev.filter((u) => u.id !== user.id))
                      }
                    >
                      <BsTrashFill />
                    </button>
                    <button
                      className="text-white bg-blue-500 hover:bg-blue-600 p-2"
                      title="Ver Usuario"
                      onClick={() => setViewingUser(user)}
                    >
                      <BsEyeFill />
                    </button>
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center align-middle">
                  <label
                    htmlFor={`active-switch-${user.id}`}
                    className="inline-flex items-center cursor-pointer"
                    title={
                      user.active ? "Desactivar Usuario" : "Activar Usuario"
                    }
                  >
                    <input
                      id={`active-switch-${user.id}`}
                      type="checkbox"
                      className="sr-only peer"
                      checked={!!user.active}
                      onChange={() => handleActiveToggle(user.id)}
                      aria-label="Activo"
                    />
                    <div
                      className="relative w-11 h-6 rounded-full bg-gray-300 transition-colors
                                 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500
                                 peer-checked:bg-green-600
                                 after:content-[''] after:absolute after:top-0.5 after:left-0.5
                                 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow
                                 after:transition-all peer-checked:after:translate-x-5"
                    ></div>
                    <span className="ml-3 text-sm font-medium text-gray-900">
                      {user.active ? "Sí" : "No"}
                    </span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editingUser && (
          <EditUserModal
            user={editingUser}
            pacientes={pacientesData}
            doctors={doctorsData}
            admins={adminsData}
            onSave={handleSaveUser}
            onClose={() => setEditingUser(null)}
          />
        )}

        {viewingUser && (
          <ViewUserModal
            user={viewingUser}
            pacientes={pacientesData}
            doctors={doctorsData}
            admins={adminsData}
            onClose={() => setViewingUser(null)}
          />
        )}
      </div>
    </>
  );
}
