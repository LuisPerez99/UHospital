import { Outlet, Link } from "react-router";

export function SPDoctor() {
    return (
        <div className="w-64 bg-gray-100 p-4">
            <h2 className="text-lg font-bold">Panel del Doctor</h2>
            <nav>
                <Link to="/dashboard/doctor/appointments" className="block mb-2 text-blue-500 hover:underline">
                    Mis Citas
                </Link>
                <Link to="/dashboard/doctor/patients" className="block mb-2 text-blue-500 hover:underline">
                    Mis Pacientes
                </Link>
                <Link to="/dashboard/doctor/profile" className="block mb-2 text-blue-500 hover:underline">
                    Mi Perfil
                </Link>
            </nav>
        </div>
    )
}