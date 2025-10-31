import { Link } from "react-router"

export function RegisterForm() {
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
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
                >
                    Registrarse
                </button>
            </form>
            <p className="text-center mt-4">¿Ya tienes una cuenta?{' '}
                <Link to="/login" className="text-blue-600 hover:underline">
                    Iniciar Sesión
                </Link>
            </p>
        </>
    )
}

