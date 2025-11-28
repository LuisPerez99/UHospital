import type { Cita, Doctor, Paciente } from "../models/models";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { ModalInfoContacto } from "./ModalInfoContacto";

interface CitasProps {
  citas: Cita[];
  pacientes: Paciente[];
  doctors: Doctor[];
}

export function Citas({ citas, pacientes, doctors }: CitasProps) {
  const [selectedEstado, setSelectedEstado] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedEmail, setClickedEmail] = useState<string | null>(null);

  const { user } = useAuth();

  const filterCitasForUser = () => {
    if (user?.role === "PACIENTE") {
      return citas.filter((cita) => cita.pacienteEmail === user.email);
    } else if (user?.role === "DOCTOR") {
      return citas.filter((cita) => cita.doctorEmail === user.email);
    }
    return citas;
  };

  const userCitas = filterCitasForUser();

  const filtrarPorEstado = (estado: string) => {
    if (estado === "all") {
      return userCitas;
    }
    return userCitas.filter((cita) => cita.estado === estado);
  };

  const estados = [
    "PENDIENTE",
    "CONFIRMADA",
    "CANCELADA",
    "EN_PROGRESO",
    "COMPLETADA",
  ];

  return (
    <>
      <div className="mb-4 p-4 bg-gray-100 rounded shadow-md">
        <h2 className="text-2xl font-bold">Mis Citas</h2>
      </div>
      <div className="mb-4 p-4 bg-white rounded shadow-md  md:flex-row md:items-center md:justify-between">
        <span className="text-lg font-semibold mr-4">Filtrar por estado:</span>
        <div className="flex gap-2 mt-2">
          <select
            value={selectedEstado}
            onChange={(e) => setSelectedEstado(e.target.value)}
            className="border border-gray-300 rounded p-2"
          >
            <option value="all">Todas</option>
            {estados.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
          <div className="flex items-center">
            <span className="mr-2">Mostrando:</span>
            <span className="font-semibold">
              {selectedEstado === "all" ? "Todas las citas" : selectedEstado}
            </span>
          </div>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-4 rounded shadow-md">
        {userCitas.length === 0 ? (
          <p>No hay citas disponibles.</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border border-gray-300 bg-gray-200">
                  Paciente
                </th>
                <th className="py-2 px-4 border border-gray-300 bg-gray-200">
                  Doctor
                </th>
                <th className="py-2 px-4 border border-gray-300 bg-gray-200">
                  Fecha
                </th>
                <th className="py-2 px-4 border border-gray-300 bg-gray-200">
                  Hora
                </th>
                <th className="py-2 px-4 border border-gray-300 bg-gray-200">
                  Motivo
                </th>
                <th className="py-2 px-4 border border-gray-300 bg-gray-200">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              {filtrarPorEstado(selectedEstado).map((cita) => (
                <tr key={cita.id}>
                  <td
                    className={user?.role !== "PACIENTE" ? "py-2 px-4 border border-gray-300 hover:text-blue-600 hover:bg-gray-100" : "py-2 px-4 border border-gray-300"}
                    title={
                      user?.role !== "PACIENTE" ? "Información de contacto" : ""
                    }
                    onClick={() => {
                      setIsModalOpen(true);
                      setClickedEmail(cita.pacienteEmail);
                    }}
                    style={user?.role !== "PACIENTE" ? { cursor: "pointer" } : {}}
                  >
                    {cita.pacienteEmail}
                  </td>
                  <td
                    className={user?.role !== "DOCTOR" ? "py-2 px-4 border border-gray-300 hover:text-blue-600 hover:bg-gray-100" : "py-2 px-4 border border-gray-300"}
                    title={
                      user?.role !== "DOCTOR" ? "Información de contacto" : ""
                    }
                    onClick={() => {
                      setIsModalOpen(true);
                      setClickedEmail(cita.doctorEmail);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {cita.doctorEmail}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {cita.fecha}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {cita.hora}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {cita.motivo}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {cita.estado}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {isModalOpen && clickedEmail && (
        <ModalInfoContacto
          email={clickedEmail}
          pacientes={pacientes}
          doctors={doctors}
          onClose={() => {
            setIsModalOpen(false);
            setClickedEmail(null);
          }}
        />
      )}
    </>
  );
}
