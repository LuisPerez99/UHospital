import { useConfig } from "../contexts/ConfigContext"
import { useState } from "react"
import type { User, Doctor } from "../models/models"

interface RegisterDoctorProps {
    user: User;
}

export function RegisterDoctor({ user }: RegisterDoctorProps) {
    const { baseURL } = useConfig();
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [especialidad, setEspecialidad] = useState("");
    const [telefono, setTelefono] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const doctor: Doctor = {
            nombre: nombre,
            apellido: apellido,
            especialidad: especialidad,
            email: user.email,
            telefono: telefono,
        };

        try {
            const response = await fetch(`${baseURL}/register/doctor`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: user,
                    doctor: doctor,
                }),
            });
            if (!response.ok) {
                throw new Error("Error al registrar médico");
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
                <label className="block text-gray-700 mb-2" htmlFor="especialidad">
                    Especialidad
                </label>
                <input
                    type="text"
                    id="especialidad"
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    placeholder="Ingrese la especialidad del médico"
                    value={especialidad}
                    onChange={(e) => setEspecialidad(e.target.value)}
                />
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
            <button
                type="submit"
                className="w-full bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
            >
                Registrar Médico
            </button>
        </>
    )
}
