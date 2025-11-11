import type { User, Doctor, Admin } from '../../models/models';
import { users, doctors, admins } from '../../data/users';
import { Outlet, Link } from 'react-router';

export function UserManagement() {
    return (
        <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Gestión de Usuarios</h2>
            <div className="mb-6">
                <h3 className="text-md font-semibold mb-2">Usuarios</h3>
                <ul className="list-disc list-inside">
                    {users.map((user: User) => (
                        <li key={user.id}>
                            {user.username} - {user.email} - Rol: {user.role}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
