import { Link } from "react-router"
import { useConfig } from "../contexts/ConfigContext"
import { RegisterDoctor } from "./RegisterDoctor"
import { useState } from "react"
import { RegisterAdmin } from "./RegisterAdmin"
import { RegisterPaciente } from "./RegisterPaciente"

export function RegisterForm() {
    const { baseURL } = useConfig()
    const [selectedRole, setSelectedRole] = useState("DOCTOR");

    return (
        <>
            <form className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Crear una Cuenta</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="username">
                        Nombre de Usuario
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        placeholder="Ingrese su nombre de usuario"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="email">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        placeholder="Ingrese su correo electrónico"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="password">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        placeholder="Ingrese su contraseña"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
                        Confirmar Contraseña
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        placeholder="Confirme su contraseña"
                    />
                </div>
                {localStorage.getItem("userRole") === "ADMIN" && (
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="role">
                            Rol
                        </label>
                        <select
                            id="role"
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                        >
                            <option value="DOCTOR">Doctor</option>
                            <option value="ADMIN">Administrador</option>
                        </select>
                    </div>
                )}
                {localStorage.getItem("userRole") === "ADMIN" && selectedRole === "DOCTOR" && <RegisterDoctor />}
                {localStorage.getItem("userRole") === "ADMIN" && selectedRole === "ADMIN" && <RegisterAdmin />}
                {localStorage.getItem("userRole") !== "ADMIN" && <RegisterPaciente />}
            </form>
            <p className="text-center mt-4">¿Ya tienes una cuenta?{' '}
                <Link to="/login" className="text-blue-600 hover:underline">
                    Iniciar Sesión
                </Link>
            </p>
        </>
    )
}

