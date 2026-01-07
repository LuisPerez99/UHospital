// import { useConfig } from "../contexts/ConfigContext";
import type { User, Paciente } from "../models/models";
import { useState } from "react";
import { users, pacientes } from "../data/users";
import { useNavigate } from "react-router";

interface RegisterPacienteProps {
  username: string;
  onUsernameChange: (username: string) => void;
  email: string;
  onEmailChange: (email: string) => void;
  password: string;
  onPasswordChange: (password: string) => void;
  confirmPassword: string;
  onConfirmPasswordChange: (confirmPassword: string) => void;
  emailError?: boolean;
  passwordError?: boolean;
  onEmailError?: (hasError: boolean) => void;
  onPasswordError?: (hasError: boolean) => void;
}

export function RegisterPaciente({
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
}: RegisterPacienteProps) {
  // const { baseURL } = useConfig();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [genero, setGenero] = useState("M");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    onEmailError?.(false);
    onPasswordError?.(false);

    const user: User = {
      id: 0,
      username: username,
      email: email,
      password: password,
      role: "",
    };

    if (user.password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      onPasswordError?.(true);
      return;
    }

    user.role = "PACIENTE";
    const paciente: Paciente = {
      nombre: nombre,
      apellido: apellido,
      email: user.email,
      fecha_nacimiento: fechaNacimiento,
      genero: genero,
      telefono: telefono,
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
        role: "PACIENTE",
      });

      pacientes.push(paciente);

      setNombre("");
      setApellido("");
      setFechaNacimiento("");
      setGenero("M");
      setTelefono("");
      setDireccion("");
      setErrorMessage("");
      onEmailError?.(false);
      onPasswordError?.(false);
      onUsernameChange("");
      onEmailChange("");
      onPasswordChange("");
      onConfirmPasswordChange("");

      if (localStorage.getItem("loggedInUser")) {
        const loggedInUser = JSON.parse(
          localStorage.getItem("loggedInUser") || "{}"
        );
        if (loggedInUser.role === "ADMIN") {
          return;
        }
      }

      setRegisterSuccess(true);
      setTimeout(() => {
        setRegisterSuccess(false);
      }, 3000);

      navigate("/login", { replace: true });
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
          placeholder="Ingrese los nombres del paciente"
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
          placeholder="Ingrese los apellidos del paciente"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="genero">
          Género
        </label>
        <select
          id="genero"
          className="w-full px-3 py-2 border border-gray-300 rounded"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
        >
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="telefono">
          Teléfono
        </label>
        <input
          type="text"
          id="telefono"
          className="w-full px-3 py-2 border border-gray-300 rounded"
          placeholder="Ingrese el teléfono del paciente"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
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
          placeholder="Ingrese la dirección del paciente"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
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
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {errorMessage}
        </div>
      )}
      {registerSuccess && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          Registro exitoso. Redirigiendo a la página de inicio de sesión...
        </div>
      )}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
        onClick={handleSubmit}
      >
        Registrar Paciente
      </button>
    </>
  );
}
