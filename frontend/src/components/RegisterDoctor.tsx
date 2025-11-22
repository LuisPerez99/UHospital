// import { useConfig } from "../contexts/ConfigContext";
import { useState } from "react";
import type { User, Doctor } from "../models/models";
import { users, doctors } from "../data/users";

interface RegisterDoctorProps {
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

export function RegisterDoctor({
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
}: RegisterDoctorProps) {
  // const { baseURL } = useConfig();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [direccion, setDireccion] = useState("");
  const [genero, setGenero] = useState("");
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
      role: "DOCTOR",
    };

    if (user.password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      onPasswordError?.(true);
      return;
    }

    const doctor: Doctor = {
      nombre: nombre,
      apellido: apellido,
      especialidad: especialidad,
      email: user.email,
      telefono: telefono,
      fecha_nacimiento: fechaNacimiento,
      direccion: direccion,
      genero: genero,
    };

    try {
      const existingUser = users.find((u) => u.email === user.email);
      if (existingUser) {
        setErrorMessage("El correo electrónico ya está registrado");
        onEmailError?.(true);
        return;
      }

      users.push(user);
      doctors.push(doctor);

      alert("Médico registrado exitosamente");

      onUsernameChange("");
      onEmailChange("");
      onPasswordChange("");

      setNombre("");
      setApellido("");
      setEspecialidad("");
      setTelefono("");
      setErrorMessage("");
      onEmailError?.(false);
      onPasswordError?.(false);
      onConfirmPasswordChange("");

      doctors.forEach((doctor) => {
        // print doctor info to console
        console.log(
          `Doctor: ${doctor.nombre} ${doctor.apellido}, Especialidad: ${doctor.especialidad}, Email: ${doctor.email}, Teléfono: ${doctor.telefono}`
        );
      });
    } catch (error) {
      console.error(error);
      setErrorMessage("Ocurrió un error inesperado. Intente nuevamente");
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
          placeholder="Ingrese los nombres del médico"
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
          placeholder="Ingrese los apellidos del médico"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="especialidad">
          Especialidad
        </label>
        <input
          type="text"
          id="especialidad"
          className="w-full px-3 py-2 border border-gray-300 rounded"
          placeholder="Ingrese la especialidad del médico"
          value={especialidad}
          onChange={(e) => setEspecialidad(e.target.value)}
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
          placeholder="Ingrese el teléfono del médico"
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
          placeholder="Ingrese la fecha de nacimiento del médico"
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="genero">
          <select
            id="genero"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
          >
            <option value="">Seleccione el género</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="direccion">
          Dirección
        </label>
        <input
          type="text"
          id="direccion"
          className="w-full px-3 py-2 border border-gray-300 rounded"
          placeholder="Ingrese la dirección del médico"
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
        Registrar Médico
      </button>
    </>
  );
}
