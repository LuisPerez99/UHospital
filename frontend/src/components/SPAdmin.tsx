import { Outlet, Link } from "react-router";

export function SPAdmin() {
    return (
        <div className="w-48 mr-4 p-4 border-r">
            <h2 className="text-lg font-bold mb-4">Panel de Administrador</h2>
            <nav>
                    <Link to="/dashboard/admin/user-management" className="block mb-2 text-blue-500 hover:underline">
                        Gestión de Usuarios
                    </Link>
                    <Link to="/dashboard/admin/system-settings" className="block mb-2 text-blue-500 hover:underline">
                        Configuración del Sistema
                    </Link>
                    <Link to="/dashboard/admin/reports" className="block mb-2 text-blue-500 hover:underline">
                        Informes
                    </Link>
            </nav>
            <Outlet />
        </div>
    )
}