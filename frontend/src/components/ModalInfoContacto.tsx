import { useEffect, useState } from "react";
import type { Doctor, Paciente } from "../models/models";

interface ModalInfoContactoProps {
  email: string;
  pacientes?: Paciente[];
  doctors?: Doctor[];
  onClose: () => void;
}

export function ModalInfoContacto({ email, pacientes, doctors, onClose }: ModalInfoContactoProps) {
  const [isVisible, setIsVisible] = useState(false);
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300); // esperar a que termine la transición
  };

  const contactoPaciente = pacientes?.find((p) => p.email === email);
  const contactoDoctor = doctors?.find((d) => d.email === email);

  useEffect(() => {
    // mostrar transición después de montar
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-lg w-96 transition-transform duration-300 transform ${
          isVisible ? "scale-100" : "scale-95"
        }`}
      >
        <h2 className="text-xl font-bold mb-4">Información de Contacto</h2>
        {contactoPaciente && (
          <div className="mb-4">
            <p className="mb-1"><strong>Nombre:</strong> {contactoPaciente.nombre} {contactoPaciente.apellido}</p>
            <p className="mb-1"><strong>Teléfono:</strong> {contactoPaciente.telefono}</p>
            <p className="mb-1"><strong>Dirección:</strong> {contactoPaciente.direccion}</p>
          </div>
        )}
        {contactoDoctor && (
          <div className="mb-4">
            <p className="mb-1"><strong>Nombre:</strong> {contactoDoctor.nombre} {contactoDoctor.apellido}</p>
            <p className="mb-1"><strong>Teléfono:</strong> {contactoDoctor.telefono}</p>
            <p className="mb-1"><strong>Especialidad:</strong> {contactoDoctor.especialidad}</p>
          </div>
        )}
        {!contactoPaciente && !contactoDoctor && (
          <p>No se encontró información de contacto para este correo electrónico.</p>
        )}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
          onClick={handleClose}
          style={{ cursor: "pointer" }}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
