import { users, pacientes } from "../../data/users";
import type { User, Paciente } from "../../models/models";

export function PatientsList() {
    return (
        <div className="p-4">
            <h2 className="text-lg font-bold">Lista de Pacientes</h2>
            <ul className="mt-4 space-y-2">
                {pacientes.map((paciente: Paciente) => {
                    const user: User | undefined = users.find(u => u.email === paciente.email);
                    return (
                        <li key={user?.id} className="p-2 border rounded">
                            <p><strong>Nombre:</strong> {paciente.nombre} {paciente.apellido}</p>
                            <p><strong>Género:</strong> {paciente.genero}</p>
                            <p><strong>Correo Electrónico:</strong> {paciente.email}</p>
                            <p><strong>Fecha de Nacimiento:</strong> {paciente.fecha_nacimiento}</p>
                            <p><strong>Edad:</strong> {Math.floor((Date.now() - new Date(paciente.fecha_nacimiento).getTime()) / (1000 * 60 * 60 * 24 * 365))}</p>
                            <p><strong>Teléfono:</strong> {paciente.telefono}</p>
                            <p><strong>Dirección:</strong> {paciente.direccion}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}