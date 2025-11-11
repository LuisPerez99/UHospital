import { Outlet, Link } from 'react-router';

export function UserManagement() {
    return (
        <div className="w-64 bg-gray-100 p-4">
            <h2 className="text-lg font-bold mb-4">Gestión de Usuarios</h2>
            <nav>
                <Link to="/dashboard/admin/user-management/pacientes" className="block mb-2 text-blue-500 hover:underline">
                    Pacientes
                </Link>
                <Link to="/dashboard/admin/user-management/doctors" className="block mb-2 text-blue-500 hover:underline">
                    Doctores
                </Link>
                <Link to="/dashboard/admin/user-management/admins" className="block mb-2 text-blue-500 hover:underline">
                    Administradores
                </Link>
            </nav>
            <Outlet />
        </div>
    )
}
