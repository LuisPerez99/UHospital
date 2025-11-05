import { useConfig } from "../contexts/ConfigContext"

export function RegisterPaciente() {
    const { baseURL } = useConfig();

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
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="genero">
                    Género
                </label>
                <select
                    id="genero"
                    className="w-full px-3 py-2 border border-gray-300 rounded"
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
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
            >
                Registrar Paciente
            </button>
        </>
    )
}