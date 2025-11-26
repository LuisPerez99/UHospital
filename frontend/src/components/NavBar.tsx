import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
// import { useConfig } from "../contexts/ConfigContext";
import { useAuth } from "../contexts/AuthContext";

export function NavBar() {
  // const { baseURL } = useConfig();
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState<boolean>(
    !!localStorage.getItem("loggedInUser")
  );
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
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

  useEffect(() => {
    const update = () => setLoggedIn(!!localStorage.getItem("loggedInUser"));
    window.addEventListener("uhospital:auth", update);
    return () => {
      window.removeEventListener("uhospital:auth", update);
    };
  }, []);

  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md">
      <div className="flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link to="/">UHospital</Link>
        </div>
        <div>
          {loggedIn && user ? (
            <>
              <span className="mr-4">Hola, {user.username}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <div className="flex">
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
              >
                Registrarse
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
