import type { Cita } from "../models/models";
import { useAuth } from "../contexts/AuthContext";

interface CitasProps {
  citas: Cita[];
}

export function Citas({ citas }: CitasProps) {
    const { user } = useAuth();

    const filterCitasForUser = () => {
        if (user?.role === "PACIENTE") {
            return citas.filter(cita => cita.pacienteEmail === user.email);
        } else if (user?.role === "DOCTOR") {
            return citas.filter(cita => cita.doctorEmail === user.email);
        }
        return citas;
    };

    const userCitas = filterCitasForUser();

    const filtrarPorEstado = (estado: string) => {
        return userCitas.filter(cita => cita.estado === estado);
    };

    const estados = ["PENDIENTE", "CONFIRMADA", "CANCELADA", "EN_PROGRESO", "COMPLETADA"];

    return (
        <div className="p-4 flex flex-col gap-4 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Citas</h2>
            {userCitas.length === 0 ? (
                <p>No hay citas disponibles.</p>
            ) : (
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Paciente</th>
                            <th className="py-2 px-4 border-b">Doctor</th>
                            <th className="py-2 px-4 border-b">Fecha</th>
                            <th className="py-2 px-4 border-b">Hora</th>
                            <th className="py-2 px-4 border-b">Motivo</th>
                            <th className="py-2 px-4 border-b">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userCitas.map((cita) => (
                            <tr key={cita.id}>
                                <td className="py-2 px-4 border-b text-center align-middle">{cita.pacienteEmail}</td>
                                <td className="py-2 px-4 border-b text-center align-middle">{cita.doctorEmail}</td>
                                <td className="py-2 px-4 border-b text-center align-middle">{cita.fecha}</td>
                                <td className="py-2 px-4 border-b text-center align-middle">{cita.hora}</td>
                                <td className="py-2 px-4 border-b text-center align-middle">{cita.motivo}</td>
                                <td className="py-2 px-4 border-b text-center align-middle">{cita.estado}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}