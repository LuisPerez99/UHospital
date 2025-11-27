import type { User, Paciente, Doctor, Admin } from "../models/models";
import { useEffect, useState } from "react";
import { BsXCircle } from "react-icons/bs";
import Avatar from "boring-avatars";

interface ViewUserModalProps {
  user: User;
  pacientes: Paciente[];
  doctors: Doctor[];
  admins: Admin[];
  onClose: () => void;
}

export function ViewUserModal({
  user,
  pacientes,
  doctors,
  admins,
  onClose,
}: ViewUserModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // mostrar transición después de montar
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300); // esperar a que termine la transición
  };

  return (
    <div>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 sm:items-start sm:pt-10 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => {
          if (e.target === e.currentTarget) handleClose();
        }}
      >
        <div className={`bg-white rounded-lg shadow-lg p-6 w-96 items-center relative transition-transform duration-300 transform ${
          isVisible ? "scale-100" : "scale-95"
        }`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Detalles del Usuario</h2>
            <button
              onClick={handleClose}
              className="text-red-600 hover:text-red-800"
              title="Cerrar"
            >
              <BsXCircle size={24} />
            </button>
          </div>
          <Avatar
            size={100}
            name={user.username}
            variant="beam"
            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
            className="mb-4 mx-auto"
          />
          <div className="text-center mb-4">
            <h3 className="text-xl font-semibold">
              {user.username}
            </h3>
            <p className="text-gray-600">{user.role}</p>
          </div>
          <div className="text-left">
          <p className="mb-2">
            <strong>ID:</strong> {user.id}
          </p>
          </div>
          <p className="mb-2">
            <strong>Email:</strong> {user.email}
          </p>
          {user.role === "PACIENTE" &&
            (() => {
              const paciente = pacientes.find(
                (p) => p.email === user.email
              ) as Paciente;
              return paciente ? (
                <>
                  <p className="mb-2">
                    <strong>Nombre:</strong> {paciente.nombre}
                  </p>
                  <p className="mb-2">
                    <strong>Apellido:</strong> {paciente.apellido}
                  </p>
                  <p className="mb-2">
                    <strong>Fecha de Nacimiento:</strong>{" "}
                    {paciente.fecha_nacimiento}
                  </p>
                  <p className="mb-2">
                    <strong>Género:</strong> {paciente.genero}
                  </p>
                  <p className="mb-2">
                    <strong>Teléfono:</strong> {paciente.telefono}
                  </p>
                  <p className="mb-2">
                    <strong>Dirección:</strong> {paciente.direccion}
                  </p>
                </>
              ) : null;
            })()}
          {user.role === "DOCTOR" &&
            (() => {
              const doctor = doctors.find(
                (d) => d.email === user.email
              ) as Doctor;
              return doctor ? (
                <>
                  <p className="mb-2">
                    <strong>Nombre:</strong> {doctor.nombre}
                  </p>
                  <p className="mb-2">
                    <strong>Apellido:</strong> {doctor.apellido}
                  </p>
                  <p className="mb-2">
                    <strong>Fecha de Nacimiento:</strong>{" "}
                    {doctor.fecha_nacimiento}
                  </p>
                  <p className="mb-2">
                    <strong>Género:</strong> {doctor.genero}
                  </p>
                  <p className="mb-2">
                    <strong>Teléfono:</strong> {doctor.telefono}
                  </p>
                  <p className="mb-2">
                    <strong>Dirección:</strong> {doctor.direccion}
                  </p>
                  <p className="mb-2">
                    <strong>Especialidad:</strong> {doctor.especialidad}
                  </p>
                </>
              ) : null;
            })()}
          {user.role === "ADMIN" &&
            (() => {
              const admin = admins.find((a) => a.email === user.email) as Admin;
              return admin ? (
                <>
                  <p className="mb-2">
                    <strong>Nombre:</strong> {admin.nombre}
                  </p>
                  <p className="mb-2">
                    <strong>Apellido:</strong> {admin.apellido}
                  </p>
                  <p className="mb-2">
                    <strong>Fecha de Nacimiento:</strong>{" "}
                    {admin.fecha_nacimiento}
                  </p>
                  <p className="mb-2">
                    <strong>Género:</strong> {admin.genero}
                  </p>
                  <p className="mb-2">
                    <strong>Teléfono:</strong> {admin.telefono}
                  </p>
                  <p className="mb-2">
                    <strong>Dirección:</strong> {admin.direccion}
                  </p>
                </>
              ) : null;
            })()}
        </div>
      </div>
    </div>
  );
}
