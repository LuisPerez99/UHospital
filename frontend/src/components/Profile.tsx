import { useAuth } from "../contexts/AuthContext";
import Avatar from "boring-avatars";

export function Profile() {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 bg-gray-100 p-2 rounded shadow-md">Mi Perfil</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <Avatar
            size={80}
            name={user?.username || "Usuario"}
            variant="beam"
            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
          />
          <div className="ml-4">
            <h2 className="text-xl font-semibold">
              {user?.nombre} {user?.apellido}
            </h2>
            <p className="text-gray-600">{user?.role}</p>
          </div>
        </div>
        <p className="mb-2">
          <strong>Nombre de Usuario:</strong> {user?.username}
        </p>
        <p className="mb-2">
          <strong>Correo Electrónico:</strong> {user?.email}
        </p>
        <p className="mb-2">
          <strong>Nombre Completo:</strong>{" "}
          {user?.nombre + " " + user?.apellido}
        </p>
        <p className="mb-2">
          <strong>Fecha de Nacimiento:</strong> {user?.fechaNacimiento}
        </p>
        <p className="mb-2">
          <strong>Edad:</strong>{" "}
          {user?.fechaNacimiento
            ? Math.floor(
                (new Date().getTime() -
                  new Date(user.fechaNacimiento).getTime()) /
                  (1000 * 60 * 60 * 24 * 365.25)
              )
            : ""}{" "}
          años
        </p>
        <p className="mb-2">
          <strong>Género:</strong> {user?.genero}
        </p>
        <p className="mb-2">
          <strong>Dirección:</strong> {user?.direccion}
        </p>
        {user?.role === "DOCTOR" && (
          <p className="mb-2">
            <strong>Especialidad: </strong> {user?.especialidad}
          </p>
        )}
        <p className="mb-2">
          <strong>Teléfono:</strong> {user?.telefono}
        </p>
      </div>
    </div>
  );
}
