// import { useConfig } from "../contexts/ConfigContext";
import { useState } from "react";
import type { User, Admin } from "../models/models";
import { users, admins } from "../data/users";

interface RegisterAdminProps {
  username: string;
  onUsernameChange: (username: string) => void;
  email: string;
  onEmailChange: (email: string) => void;
  password: string;
  onPasswordChange: (password: string) => void;
  onConfirmPasswordChange: (confirmPassword: string) => void;
  confirmPassword: string;
  emailError?: boolean;
  passwordError?: boolean;
  onEmailError?: (hasError: boolean) => void;
  onPasswordError?: (hasError: boolean) => void;
}

export function RegisterAdmin({
  username,
  onUsernameChange,
  email,
  onEmailChange,
  password,
  onPasswordChange,
  confirmPassword,
  onConfirmPasswordChange,
  emailError,
  passwordError,
  onEmailError,
  onPasswordError,
}: RegisterAdminProps) {
  // const { baseURL } = useConfig();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [direccion, setDireccion] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    onEmailError?.(false);
    onPasswordError?.(false);
    
    const user: User = {
      id: users.length + 1,
      username: username,
      email: email,
      password: password,
      role: "ADMIN",
    };

    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      onPasswordError?.(true);
      return;
    }


    const admin: Admin = {
      nombre: nombre,
      apellido: apellido,
      email: user.email,
      telefono: telefono,
      fecha_nacimiento: fechaNacimiento,
      direccion: direccion,
    };

    try {
      const existingUser = users.find((u) => u.email === user.email);
      if (existingUser) {
        setErrorMessage("El correo electrónico ya está registrado");
        onEmailError?.(true);
        return;
      }

      users.push({
        id: users.length + 1,
        username: user.username,
        email: user.email,
        password: user.password,
        role: "ADMIN",
      });

      admins.push(admin);

      alert("Administrador registrado exitosamente");
      
      setNombre("");
      setApellido("");
      setTelefono("");
      setErrorMessage("");
      onEmailError?.(false);
      onPasswordError?.(false);
      onUsernameChange("");
      onEmailChange("");
      onPasswordChange("");
      onConfirmPasswordChange("");
      admins.forEach(admin => {
        console.log(`Administrador: ${admin.nombre} ${admin.apellido}, Email: ${admin.email}, Teléfono: ${admin.telefono}`);
      });
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
        <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="fecha_nacimiento">
            Fecha de Nacimiento
            </label>
            <input
            type="date"
            id="fecha_nacimiento"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="direccion">
            Dirección
            </label>
            <input
            type="text"
            id="direccion"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Ingrese la dirección del administrador"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
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
