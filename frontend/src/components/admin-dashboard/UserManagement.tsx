import { useState } from "react";
import { BsPencilFill, BsTrashFill, BsEyeFill } from "react-icons/bs";
import type { User } from "../../models/models";
import { users } from "../../data/users";
import { EditUserModal } from "./EditUserModal";

export function UserManagement() {
  const [filter, setFilter] = useState("all");

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  const filteredUsers =
    filter === "all"
      ? users
      : users.filter((user) => user.role.toLowerCase() === filter);

  return (
    <>
      <div className="w-64 bg-gray-100 p-4">
        <h2 className="text-lg font-bold">Gestión de Usuarios</h2>
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
                    >
                      <BsPencilFill />
                    </button>
                    <button
                      className="text-white bg-red-500 hover:bg-red-600 p-2"
                      title="Eliminar Usuario"
                    >
                      <BsTrashFill />
                    </button>
                    <button
                      className="text-white bg-blue-500 hover:bg-blue-600 p-2"
                      title="Ver Usuario"
                    >
                      <BsEyeFill />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

