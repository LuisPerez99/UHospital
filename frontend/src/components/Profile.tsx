import { useAuth } from "../contexts/AuthContext";
import Avatar from "boring-avatars";
import { EditUserModal } from "./EditUserModal";
import { useState } from "react";
import { BsPencilFill } from "react-icons/bs";
import { Link } from "react-router";

import type {
  User,
  Paciente,
  Doctor,
  Admin,
  ExtendedUser,
} from "../models/models";

interface ProfileProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  pacientes: Paciente[];
  setPacientes: React.Dispatch<React.SetStateAction<Paciente[]>>;
  doctors: Doctor[];
  setDoctors: React.Dispatch<React.SetStateAction<Doctor[]>>;
  admins: Admin[];
  setAdmins: React.Dispatch<React.SetStateAction<Admin[]>>;
}

export function Profile({
  users: data,
  setUsers: setData,
  pacientes: pacientesData,
  setPacientes: setPacientesData,
  doctors: doctorsData,
  setDoctors: setDoctorsData,
  admins: adminsData,
  setAdmins: setAdminsData,
}: ProfileProps) {
  const { user, login } = useAuth();
  const [editingUser, setEditingUser] = useState<ExtendedUser | null>(null);

  const handleSave = (updated: ExtendedUser) => {
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
      // update the AuthContext stored user so the profile reflects changes immediately
      login(updated);
    }

    setEditingUser(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 bg-gray-100 p-2 rounded shadow-md">
        Mi Perfil
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <Avatar
            size={80}
            name={user?.username || "Usuario"}
            variant="beam"
            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
          />
          <div className="ml-4">
            <h2 className="text-xl font-semibold">
              {user?.nombre} {user?.apellido}
            </h2>
            <p className="text-gray-600">{user?.role}</p>
          </div>
        </div>
        <p className="mb-2">
          <strong>Nombre de Usuario:</strong> {user?.username}
        </p>
        <p className="mb-2">
          <strong>Correo Electrónico:</strong> {user?.email}
        </p>
        <p className="mb-2">
          <strong>Nombre Completo:</strong>{" "}
          {user?.nombre + " " + user?.apellido}
        </p>
        <p className="mb-2">
          <strong>Fecha de Nacimiento:</strong> {user?.fechaNacimiento}
        </p>
        <p className="mb-2">
          <strong>Edad:</strong>{" "}
          {user?.fechaNacimiento
            ? Math.floor(
                (new Date().getTime() -
                  new Date(user.fechaNacimiento).getTime()) /
                  (1000 * 60 * 60 * 24 * 365.25)
              )
            : "N/A"} años
        </p>
        <p className="mb-2">
          <strong>Género:</strong> {user?.genero}
        </p>
        <p className="mb-2">
          <strong>Dirección:</strong> {user?.direccion}
        </p>
        {user?.role === "DOCTOR" && (
          <p className="mb-2">
            <strong>Especialidad: </strong> {user?.especialidad}
          </p>
        )}
        <p className="mb-2">
          <strong>Teléfono:</strong> {user?.telefono}
        </p>
        <div className="mt-4 flex space-x-2">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => setEditingUser(user || null)}
          >
            <BsPencilFill className="inline mr-2" /> Editar Perfil
          </button>
          <Link
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            to="/reset-password"
          >
            <BsPencilFill className="inline mr-2" /> Cambiar Contraseña
          </Link>
        </div>
        {editingUser && (
          <EditUserModal
            user={editingUser}
            pacientes={pacientesData}
            doctors={doctorsData}
            admins={adminsData}
            onClose={() => setEditingUser(null)}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  );
}
