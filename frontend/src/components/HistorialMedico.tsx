import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import type { HistorialMedico } from "../models/models";

export function HistorialMedico() {
  const { user } = useAuth();

  const [fechaInicio, setFechaInicio] = useState<string | null>(null);
  const [fechaFin, setFechaFin] = useState<string | null>(null);
  const [registrosFiltrados, setRegistrosFiltrados] = useState<HistorialMedico[]>([]);

  useEffect(() => {
    if (user?.historial_medico) {
      setRegistrosFiltrados(user.historial_medico);
    }
  }, [user]);

  useEffect(() => {
    if (fechaInicio && fechaFin && user?.historial_medico) {
      const filtrados = filtrarPorFecha(
        user.historial_medico,
        fechaInicio,
        fechaFin
      );
      setRegistrosFiltrados(filtrados);
    }
    if (user?.historial_medico) {
      setRegistrosFiltrados(user.historial_medico);
    }
  }, [fechaInicio, fechaFin, user]);

  const filtrarPorFecha = (
    registros: any[],
    fechaInicio: string,
    fechaFin: string
  ) => {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    return registros.filter((registro) => {
      const registroFecha = new Date(registro.fecha);
      return registroFecha >= inicio && registroFecha <= fin;
    });
  };

  const aplicarFiltros = () => {
    if (fechaInicio && fechaFin && user?.historial_medico) {
      const filtrados = filtrarPorFecha(
        user.historial_medico,
        fechaInicio,
        fechaFin
      );
      setRegistrosFiltrados(filtrados);
    }
  };

  return (
    <>
      <div className="mb-4 p-4 bg-gray-100 rounded shadow-md">
        <h2 className="text-2xl font-bold">Mi Historial Médico</h2>
      </div>
      <div className="mb-4 p-4 flex bg-white rounded shadow-md gap-4">
        <div className="flex flex-col">
          <span className="text-md font-semibold mr-4">Filtrar por fecha:</span>
          <div className="flex gap-2 mt-2">
            <div className="flex items-center">
              <input
                type="date"
                className="border border-gray-300 rounded p-2"
                value={fechaInicio || ""}
                onChange={(e) => setFechaInicio(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <span className="mx-2">a</span>
            </div>
            <div className="flex items-center">
              <input
                type="date"
                className="border border-gray-300 rounded p-2"
                value={fechaFin || ""}
                onChange={(e) => setFechaFin(e.target.value)}
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
                setFechaInicio("");
                setFechaFin("");
                setRegistrosFiltrados(user?.historial_medico || []);
              }}
              style={{ cursor: "pointer" }}
            >
              Reiniciar
            </button>
          </div>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-4 rounded shadow-md">
        {!registrosFiltrados || registrosFiltrados.length === 0 ? (
          <p className="text-gray-600">
            No hay registros en el historial médico.
          </p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border border-gray-300 bg-gray-200">
                  Fecha
                </th>
                <th className="py-2 px-4 border border-gray-300 bg-gray-200">
                  Descripcion
                </th>
                <th className="py-2 px-4 border border-gray-300 bg-gray-200">
                  Tipo
                </th>
                <th className="py-2 px-4 border border-gray-300 bg-gray-200">
                  Notas
                </th>
              </tr>
            </thead>
            <tbody>
              {registrosFiltrados.map((registro, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border border-gray-300">
                    {registro.fecha}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {registro.descripcion}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {registro.tipo}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {registro.notas || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
