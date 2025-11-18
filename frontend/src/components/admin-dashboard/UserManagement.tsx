import { useState } from "react";

import type { User } from "../../models/models";
import { users } from "../../data/users";

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
      {/* Renderizar lista de usuarios */}
      <div className="flex-1 p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Lista de Usuarios</h3>
        <ul>
          {filteredUsers.map((user: User) => (
            <li key={user.id} className="mb-2 p-2 border-b border-gray-300">
              <p>
                <strong>Nombre de Usuario:</strong> {user.username}
              </p>
              <p>
                <strong>Correo Electrónico:</strong> {user.email}
              </p>
              <p>
                <strong>Rol:</strong> {user.role.toLowerCase()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
