import { Outlet, Link } from "react-router";

export function SPPaciente() {
    return (
        <div className="w-64 bg-gray-100 p-4">
            <h2 className="text-lg font-bold">Panel del Paciente</h2>
            <nav>
                <Link to="/dashboard/paciente/appointments" className="block mb-2 text-blue-500 hover:underline">
                    Mis Citas
                </Link>
                <Link to="/dashboard/paciente/medical-records" className="block mb-2 text-blue-500 hover:underline">
                    Mi Historial Médico
                </Link>
                <Link to="/dashboard/paciente/profile" className="block mb-2 text-blue-500 hover:underline">
                    Mi Perfil
                </Link>
            </nav>
            <Outlet />
        </div>
    )
}