import { users, admins } from "../../data/users";

export function AdminsList() {
    return (
        <div className="p-4">
            <h2 className="text-lg font-bold">Lista de Administradores</h2>
            <ul className="mt-4 space-y-2">
                {admins.map((admin) => {
                    const user = users.find(u => u.email === admin.email);
                    return (
                        <li key={user?.id} className="p-2 border rounded">
                            <p><strong>Nombre:</strong> {admin.nombre} {admin.apellido}</p>
                            <p><strong>Correo Electrónico:</strong> {admin.email}</p>
                            <p><strong>Teléfono:</strong> {admin.telefono}</p>
                            <p><strong>Dirección:</strong> {admin.direccion}</p>
                            <p><strong>Fecha de Nacimiento:</strong> {admin.fecha_nacimiento}</p>
                            <p><strong>Edad:</strong> {Math.floor((Date.now() - new Date(admin.fecha_nacimiento).getTime()) / (1000 * 60 * 60 * 24 * 365))}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}