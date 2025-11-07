import { useConfig } from "../contexts/ConfigContext";
import { useState } from "react";
import type { User, Admin } from "../models/models";

interface RegisterAdminProps {
  user: User;
  confirmPassword: string;
  emailError?: boolean;
  passwordError?: boolean;
  onEmailError?: (hasError: boolean) => void;
  onPasswordError?: (hasError: boolean) => void;
}

export function RegisterAdmin({
  user,
  confirmPassword,
  emailError,
  passwordError,
  onEmailError,
  onPasswordError,
}: RegisterAdminProps) {
  const { baseURL } = useConfig();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    onEmailError?.(false);
    onPasswordError?.(false);

    if (user.password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      onPasswordError?.(true);
      return;
    }

    const admin: Admin = {
      nombre: nombre,
      apellido: apellido,
      email: user.email,
      telefono: telefono,
    };

    try {
      const response = await fetch(`${baseURL}/users/register/admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: user,
          administrador: admin,
        }),
      });
      if (response.status === 409) {
        setErrorMessage("El correo electrónico ya está en uso");
        onEmailError?.(true);
        return;
      }
      if (!response.ok) {
        throw new Error("Error al registrar administrador");
      }
      // Manejar respuesta exitosa
      const data = await response.json();
      alert(`Administrador ${data.username} registrado exitosamente`);
      window.location.reload();
    } catch (error) {
      console.error(error);
      setErrorMessage("Ocurrió un error inespaerado. Intente nuevamente");
    }
  };

  return (
    <>
        <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="nombre">
            Nombres
            </label>
            <input
            type="text"
            id="nombre"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Ingrese los nombres del administrador"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="apellido">
            Apellidos
            </label>
            <input
            type="text"
            id="apellido"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Ingrese los apellidos del administrador"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="telefono">
            Teléfono
            </label>
            <input
            type="text"
            id="telefono"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Ingrese el teléfono del administrador"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            />
        </div>
        {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {errorMessage}
            </div>
        )}
        <button
            type="submit"
            className="w-full bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
            onClick={handleSubmit}
        >
            Registrar Administrador
        </button>
    </>
  );
}
