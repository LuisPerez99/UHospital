import { useAuth } from "../contexts/AuthContext";

export function Profile() {
  const { user } = useAuth();

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Mi Perfil</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
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
    </>
  );
}
