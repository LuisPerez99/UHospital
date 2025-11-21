import type { User, Paciente, Doctor, Admin } from "../../models/models";
import { useEffect, useState } from "react";
import { BsXCircle } from "react-icons/bs";

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

  return (
    <div>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 sm:items-start sm:pt-10 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Detalles del Usuario</h2>
            <button
              onClick={onClose}
              className="text-red-600 hover:text-red-800"
              title="Cerrar"
            >
              <BsXCircle size={24} />
            </button>
          </div>
          <p>
            <strong>ID:</strong> {user.id}
          </p>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
          {user.role === "PACIENTE" &&
            (() => {
              const paciente = pacientes.find(
                (p) => p.email === user.email
              ) as Paciente;
              return paciente ? (
                <>
                  <p>
                    <strong>Nombre:</strong> {paciente.nombre}
                  </p>
                  <p>
                    <strong>Apellido:</strong> {paciente.apellido}
                  </p>
                  <p>
                    <strong>Fecha de Nacimiento:</strong>{" "}
                    {paciente.fecha_nacimiento}
                  </p>
                  <p>
                    <strong>Género:</strong> {paciente.genero}
                  </p>
                  <p>
                    <strong>Teléfono:</strong> {paciente.telefono}
                  </p>
                  <p>
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
                  <p>
                    <strong>Nombre:</strong> {doctor.nombre}
                  </p>
                  <p>
                    <strong>Apellido:</strong> {doctor.apellido}
                  </p>
                  <p>
                    <strong>Fecha de Nacimiento:</strong>{" "}
                    {doctor.fecha_nacimiento}
                  </p>
                  <p>
                    <strong>Género:</strong> {doctor.genero}
                  </p>
                  <p>
                    <strong>Teléfono:</strong> {doctor.telefono}
                  </p>
                  <p>
                    <strong>Dirección:</strong> {doctor.direccion}
                  </p>
                  <p>
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
                  <p>
                    <strong>Nombre:</strong> {admin.nombre}
                  </p>
                  <p>
                    <strong>Apellido:</strong> {admin.apellido}
                  </p>
                  <p>
                    <strong>Fecha de Nacimiento:</strong>{" "}
                    {admin.fecha_nacimiento}
                  </p>
                  <p>
                    <strong>Género:</strong> {admin.genero}
                  </p>
                  <p>
                    <strong>Teléfono:</strong> {admin.telefono}
                  </p>
                  <p>
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
