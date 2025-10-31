import { Link } from "react-router"

export function LoginForm() {
    return (
        <>
            <form className="max-w-md mx-auto mt-8 p-4 border border-gray-300 rounded">
                <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
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
                    Iniciar Sesión
                </button>
            </form>
            <p className="text-center mt-4">¿No tienes una cuenta?{' '}
                <Link to="/register" className="text-blue-600 hover:underline">
                    Crear una cuenta nueva
                </Link>
            </p>
            <p className="text-center mt-4">¿Olvidaste tu contraseña?{' '}
                <Link to="/reset-password" className="text-blue-600 hover:underline">
                    Restablecer contraseña
                </Link>
            </p>
        </>
    )
}
