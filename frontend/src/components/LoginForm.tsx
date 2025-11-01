import { Link } from "react-router"

export function LoginForm() {
    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault()
        
        try {
            fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: (document.getElementById("username") as HTMLInputElement).value,
                    password: (document.getElementById("password") as HTMLInputElement).value,
                }),
            })
            .then((response) => {
                if (response.ok) {
                    alert("Inicio de sesión exitoso")
                } else {
                    alert("Error en el inicio de sesión")
                }
            })
        } catch (error) {
            console.error("Error:", error)
        }
    }

    return (
        <>
            <form className="max-w-md mx-auto mt-8 p-4 border border-gray-300 rounded">
                <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
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
                    onClick={handleLogin}
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
