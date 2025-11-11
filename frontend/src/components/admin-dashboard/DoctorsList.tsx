import { users, doctors } from "../../data/users";

export function DoctorsList() {
    return (
        <div className="p-4">
            <h2 className="text-lg font-bold">Lista de Doctores</h2>
            <ul className="mt-4 space-y-2">
                {doctors.map((doctor) => {
                    const user = users.find(u => u.email === doctor.email);
                    return (
                        <li key={user?.id} className="p-2 border rounded">
                            <p><strong>Nombre:</strong> {doctor.nombre} {doctor.apellido}</p>
                            <p><strong>Especialidad:</strong> {doctor.especialidad}</p>
                            <p><strong>Correo Electrónico:</strong> {doctor.email}</p>
                            <p><strong>Teléfono:</strong> {doctor.telefono}</p>
                            <p><strong>Dirección:</strong> {doctor.direccion}</p>
                            <p><strong>Fecha de Nacimiento:</strong> {doctor.fecha_nacimiento}</p>
                            <p><strong>Edad:</strong> {Math.floor((Date.now() - new Date(doctor.fecha_nacimiento).getTime()) / (1000 * 60 * 60 * 24 * 365))}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
