import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export function ResetPassword() {
    const { user } = useAuth();

    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Restablecer Contraseña</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            placeholder="Ingresa tu correo electrónico"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                        Enviar Instrucciones
                    </button>
                </form>
            </div>
        </div>
    );
}
