import { useEffect, useState } from "react";
import { users } from "../../data/users";
import type { User, Paciente, Doctor, Admin } from "../../models/models";

interface EditUserModalProps {
  user: User;
  onSave: (updated: User) => void;
  onClose: () => void;
}

export function EditUserModal({ user, onSave, onClose }: EditUserModalProps) {
  const [username, setUsername] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [genero, setGenero] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [especialidad, setEspecialidad] = useState("");

  useEffect(() => {
    setUsername(user.username ?? "");
    setNombre((user as any).nombre ?? "");
    setApellido((user as any).apellido ?? "");
    setFechaNacimiento((user as any).fechaNacimiento ?? "");
    setGenero((user as any).genero ?? "");
    setTelefono((user as any).telefono ?? "");
    setDireccion((user as any).direccion ?? "");
    setEspecialidad((user as any).especialidad ?? "");
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const base = { ...user, username };
    const role = user.role?.toLowerCase?.() ?? user.role;
    const roleExtras =
      role === "doctor"
        ? { especialidad }
        : role === "paciente"
        ? { nombre, apellido, fechaNacimiento, genero, telefono, direccion }
        : {};

    const updated: User = { ...(base as any), ...(roleExtras as any) };

    onSave(updated);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <form
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Editar Usuario</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="username">
            Nombre de Usuario
          </label>
          <input
            type="text"
            id="username"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Ingrese el nombre de usuario"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="nombre">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Ingrese el nombre"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="apellido">
            Apellido
          </label>
          <input
            type="text"
            id="apellido"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Ingrese el apellido"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 mb-2"
            htmlFor="fecha_nacimiento"
          >
            Fecha de Nacimiento
          </label>
          <input
            type="date"
            id="fecha_nacimiento"
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="genero">
            Género
          </label>
          <select
            id="genero"
            className="w-full px-3 py-2 border border-gray-300 rounded"
          >
            <option value="">Seleccione el género</option>
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
            <option value="other">Otro</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="telefono">
            Teléfono
          </label>
          <input
            type="text"
            id="telefono"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Ingrese el número de teléfono"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="direccion">
            Dirección
          </label>
          <input
            type="text"
            id="direccion"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Ingrese la dirección"
          />
        </div>
        {user && user.role.toLowerCase() === "doctor" && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="especialidad">
              Especialidad
            </label>
            <input
              type="text"
              id="especialidad"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Ingrese la especialización del doctor"
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}
