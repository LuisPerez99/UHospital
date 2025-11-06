import { useConfig } from "../contexts/ConfigContext"
import type { User, Paciente } from "../models/models"
import { useState } from "react"

interface RegisterPacienteProps {
    user: User;
}

export function RegisterPaciente({ user }: RegisterPacienteProps) {
    const { baseURL } = useConfig();
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [genero, setGenero] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        user.role = "PACIENTE";
        const paciente: Paciente = {
            nombre: nombre,
            apellido: apellido,
            email: user.email,
            fecha_nacimiento: fechaNacimiento,
            genero: genero,
            telefono: telefono,
            direccion: direccion,
        };

        try {
            const response = await fetch(`${baseURL}/register/paciente`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: user,
                    paciente: paciente,
                }),
            });
            if (!response.ok) {
                throw new Error("Error al registrar paciente");
            }
            // Manejar respuesta exitosa
        } catch (error) {
            console.error(error);
            // Manejar error
        }
    };

    return (
        <>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="nombre">
                    Nombres
                </label>
                <input
                    type="text"
                    id="nombre"
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    placeholder="Ingrese los nombres del médico"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="apellido">
                    Apellidos
                </label>
                <input
                    type="text"
                    id="apellido"
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    placeholder="Ingrese los apellidos del médico"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="genero">
                    Género
                </label>
                <select
                    id="genero"
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    value={genero}
                    onChange={(e) => setGenero(e.target.value)}
                >
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="telefono">
                    Teléfono
                </label>
                <input
                    type="text"
                    id="telefono"
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    placeholder="Ingrese el teléfono del médico"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="direccion">
                    Dirección
                </label>
                <input
                    type="text"
                    id="direccion"
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    placeholder="Ingrese la dirección del paciente"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="fecha_nacimiento">
                    Fecha de Nacimiento
                </label>
                <input
                    type="date"
                    id="fecha_nacimiento"
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    value={fechaNacimiento}
                    onChange={(e) => setFechaNacimiento(e.target.value)}
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
                onClick={handleSubmit}
            >
                Registrar Paciente
            </button>
        </>
    )
}