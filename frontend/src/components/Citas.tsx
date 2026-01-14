import type { Cita, Doctor, Paciente } from "../models/models";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useMemo, useState } from "react";
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
  const [fechaInicial, setFechaInicial] = useState<string | null>(null);
  const [fechaFinal, setFechaFinal] = useState<string | null>(null);
  const [filteredCitas, setFilteredCitas] = useState<Cita[]>(citas);

  const { user } = useAuth();

  const cargarCitasUsuario = useMemo(() => {
    if (!user) return [];

    if (user.role === "PACIENTE") {
      return citas.filter((cita) => cita.pacienteEmail === user.email);
    } else if (user.role === "DOCTOR") {
      return citas.filter((cita) => cita.doctorEmail === user.email);
    } else {
      return citas;
    }
  }, [user, citas]);

  useEffect(() => {
    let citasFiltradas = cargarCitasUsuario;

    if (selectedEstado !== "all") {
      citasFiltradas = citasFiltradas.filter(
        (cita) => cita.estado === selectedEstado
      );
    }

    // if (fechaInicial && fechaFinal) {
    //   const inicio = new Date(fechaInicial);
    //   const fin = new Date(fechaFinal);

    //   citasFiltradas = citasFiltradas.filter((cita) => {
    //     const citaFecha = new Date(cita.fecha);
    //     return citaFecha >= inicio && citaFecha <= fin;
    //   });
    // }

    setFilteredCitas(citasFiltradas);
  }, [cargarCitasUsuario, selectedEstado]);

  const aplicarFiltros = () => {
    let citasFiltradas = cargarCitasUsuario;

    if (selectedEstado !== "all") {
      citasFiltradas = citasFiltradas.filter(
        (cita) => cita.estado === selectedEstado
      );
    }

    if (fechaInicial && fechaFinal) {
      const inicio = new Date(fechaInicial);
      const fin = new Date(fechaFinal);

      citasFiltradas = citasFiltradas.filter((cita) => {
        const citaFecha = new Date(cita.fecha);
        return citaFecha >= inicio && citaFecha <= fin;
      });
    }

    setFilteredCitas(citasFiltradas);
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
      <div className="mb-4 p-4 flex bg-white rounded shadow-md gap-4">
        <div className="flex flex-col">
          <span className="text-md font-semibold">Filtrar por estado:</span>
          <div className="flex gap-2 mt-2">
            <select
              value={selectedEstado}
              onChange={(e) => {
                setSelectedEstado(e.target.value);
                aplicarFiltros();
              }}
              className="border border-gray-300 rounded p-2"
            >
              <option value="all">Todas</option>
              {estados.map((estado) => (
                <option key={estado} value={estado}>
                  {estado}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-4 border-l pl-4 border-gray-300">
          <div className="flex flex-col">
            <span className="text-md font-semibold mr-4">
              Filtrar por fecha:
            </span>
            <div className="flex gap-2 mt-2">
              <div className="flex items-center">
                <input
                  type="date"
                  className="border border-gray-300 rounded p-2"
                  value={fechaInicial || ""}
                  onChange={(e) => setFechaInicial(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <span className="mx-2">a</span>
              </div>
              <div className="flex items-center">
                <input
                  type="date"
                  className="border border-gray-300 rounded p-2"
                  value={fechaFinal || ""}
                  onChange={(e) => setFechaFinal(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center pt-2">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={aplicarFiltros}
                style={{ cursor: "pointer" }}
              >
                Aplicar
              </button>
              <button
                className="ml-2 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => {
                  setFechaInicial(null);
                  setFechaFinal(null);
                  setFilteredCitas(cargarCitasUsuario);
                }}
                style={{ cursor: "pointer" }}
              >
                Reiniciar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-4 rounded shadow-md">
        {filteredCitas.length === 0 ? (
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
              {filteredCitas.map((cita) => (
                <tr key={cita.id}>
                  <td
                    className={
                      user?.role !== "PACIENTE"
                        ? "py-2 px-4 border border-gray-300 hover:text-blue-600 hover:bg-gray-100"
                        : "py-2 px-4 border border-gray-300"
                    }
                    title={
                      user?.role !== "PACIENTE" ? "Información de contacto" : ""
                    }
                    onClick={
                      user?.role !== "PACIENTE" ? () => {
                      setIsModalOpen(true);
                      setClickedEmail(cita.pacienteEmail);
                    } : undefined
                    }
                    style={
                      user?.role !== "PACIENTE" ? { cursor: "pointer" } : {}
                    }
                  >
                    {cita.pacienteEmail}
                  </td>
                  <td
                    className={
                      user?.role !== "DOCTOR"
                        ? "py-2 px-4 border border-gray-300 hover:text-blue-600 hover:bg-gray-100"
                        : "py-2 px-4 border border-gray-300"
                    }
                    title={
                      user?.role !== "DOCTOR" ? "Información de contacto" : ""
                    }
                    onClick={
                      user?.role !== "DOCTOR" ? () => {
                      setIsModalOpen(true);
                      setClickedEmail(cita.doctorEmail);
                    } : undefined
                    }
                    style={
                      user?.role !== "DOCTOR" ? { cursor: "pointer" } : {}
                    }
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
