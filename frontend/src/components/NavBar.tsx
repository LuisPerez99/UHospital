import { Link } from "react-router";
import { useConfig } from "../contexts/ConfigContext";

export function NavBar() {
    const { baseURL } = useConfig();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExp");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userEmail");
        window.location.href = "/";

        // const logoutFromServer = async () => {
        //     try {
        //         await fetch(`${baseURL}/users/logout`, {
        //             method: "POST",
        //             headers: {
        //                 "Content-Type": "application/json",
        //                 "Authorization": `Bearer ${localStorage.getItem("token")}`
        //             }
        //         });
        //     } catch (error) {
        //         console.error("Error logging out:", error);
        //     }
        // };
        
        // logoutFromServer();
    };

    return (
        <nav className="bg-blue-600 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-lg font-bold">
                    UHospital
                </Link>
                <div>
                    <Link to="/" className="mr-4 hover:bg-blue-700 px-3 py-2 rounded">
                        Inicio
                    </Link>
                    {!localStorage.getItem("token") ? (
                        <>
                            <Link to="/login" className="mr-4 hover:bg-blue-700 px-3 py-2 rounded">
                                Iniciar Sesión
                            </Link>
                            <Link to="/register" className="hover:bg-blue-700 px-3 py-2 rounded">
                                Registrarse
                            </Link>
                        </>
                        ) : (
                        <button
                            onClick={handleLogout}
                            className="hover:bg-blue-700 px-3 py-2 rounded"
                        >
                            Cerrar Sesión
                        </button>
                    )}
                </div>
            </div>
        </nav>
    )
}
