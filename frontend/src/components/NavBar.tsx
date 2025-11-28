import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
// import { useConfig } from "../contexts/ConfigContext";
import { useAuth } from "../contexts/AuthContext";
import Avatar from "boring-avatars";

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
      {loggedIn && user ? (
        <div className="flex justify-between items-center">
          {user.role === "PACIENTE" && (
            <div className="text-lg font-bold">
              <Link to="/dashboard/paciente">UHospital - Paciente</Link>
            </div>
          )}
          {user.role === "DOCTOR" && (
            <div className="text-lg font-bold">
              <Link to="/dashboard/doctor">UHospital - Doctor</Link>
            </div>
          )}
          {user.role === "ADMIN" && (
            <div className="text-lg font-bold">
              <Link to="/dashboard/admin">UHospital - Admin</Link>
            </div>
          )}
          <div className="flex items-center space-x-4">
            <>
              <Avatar
                size={40}
                name={user.username}
                variant="beam"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
              <span className="mr-4">Hola, {user.username}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
              >
                Cerrar Sesión
              </button>
            </>
          </div>
        </div>
      ) : (
        <div className="flex">
          <div className="text-lg font-bold grow py-2 px-4">
            <Link to="/">UHospital</Link>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/registro"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
            >
              Registrarse
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
