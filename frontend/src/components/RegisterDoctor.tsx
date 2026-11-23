import { useState } from "react";
import type { User, Doctor } from "../models/models";
import { users, doctors } from "../data/users";
import { FieldError } from "./FieldError";
import {
  inputClass,
  isFutureDate,
  todayISO,
  type RegisterFieldErrors,
} from "../utils/validation";

interface RegisterDoctorProps {
  username: string;
  onUsernameChange: (username: string) => void;
  email: string;
  onEmailChange: (email: string) => void;
  password: string;
  onPasswordChange: (password: string) => void;
  onConfirmPasswordChange: (confirmPassword: string) => void;
  validateSharedFields: () => RegisterFieldErrors;
  onSharedFieldError: (
    field: keyof RegisterFieldErrors,
    message?: string
  ) => void;
}

type DoctorFieldErrors = {
  nombre?: string;
  apellido?: string;
  especialidad?: string;
  telefono?: string;
  fechaNacimiento?: string;
  genero?: string;
  direccion?: string;
};

export function RegisterDoctor({
  username,
  onUsernameChange,
  email,
  onEmailChange,
  password,
  onPasswordChange,
  onConfirmPasswordChange,
  validateSharedFields,
  onSharedFieldError,
}: RegisterDoctorProps) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [direccion, setDireccion] = useState("");
  const [genero, setGenero] = useState("");
  const [errors, setErrors] = useState<DoctorFieldErrors>({});
  const [errorMessage, setErrorMessage] = useState("");

  const clearError = (field: keyof DoctorFieldErrors) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): DoctorFieldErrors => {
    const next: DoctorFieldErrors = {};

    if (!nombre.trim()) {
      next.nombre = "Los nombres son obligatorios.";
    }
    if (!apellido.trim()) {
      next.apellido = "Los apellidos son obligatorios.";
    }
    if (!especialidad.trim()) {
      next.especialidad = "La especialidad es obligatoria.";
    }
    if (!telefono.trim()) {
      next.telefono = "El teléfono es obligatorio.";
    }
    if (!fechaNacimiento) {
      next.fechaNacimiento = "La fecha de nacimiento es obligatoria.";
    } else if (isFutureDate(fechaNacimiento)) {
      next.fechaNacimiento = "La fecha de nacimiento no puede ser futura.";
    }
    if (!genero) {
      next.genero = "Selecciona un género.";
    }
    if (!direccion.trim()) {
      next.direccion = "La dirección es obligatoria.";
    }

    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const sharedErrors = validateSharedFields();
    const fieldErrors = validate();
    setErrors(fieldErrors);

    if (
      Object.keys(sharedErrors).length > 0 ||
      Object.keys(fieldErrors).length > 0
    ) {
      return;
    }

    const normalizedEmail = email.trim();
    const user: User = {
      id: users.length + 1,
      username: username.trim(),
      email: normalizedEmail,
      password: password,
      role: "DOCTOR",
    };

    const doctor: Doctor = {
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      especialidad: especialidad.trim(),
      email: user.email,
      telefono: telefono.trim(),
      fecha_nacimiento: fechaNacimiento,
      direccion: direccion.trim(),
      genero: genero,
    };

    try {
      const existingUser = users.find((u) => u.email === normalizedEmail);
      if (existingUser) {
        onSharedFieldError(
          "email",
          "El correo electrónico ya está registrado."
        );
        return;
      }

      users.push(user);
      doctors.push(doctor);

      alert("Médico registrado exitosamente");

      onUsernameChange("");
      onEmailChange("");
      onPasswordChange("");
      onConfirmPasswordChange("");

      setNombre("");
      setApellido("");
      setEspecialidad("");
      setTelefono("");
      setFechaNacimiento("");
      setGenero("");
      setDireccion("");
      setErrors({});
      setErrorMessage("");
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
          className={inputClass(!!errors.nombre)}
          placeholder="Ingrese los nombres del médico"
          value={nombre}
          onChange={(e) => {
            setNombre(e.target.value);
            clearError("nombre");
          }}
          required
          aria-invalid={!!errors.nombre}
          aria-describedby={errors.nombre ? "doctor-nombre-error" : undefined}
        />
        <FieldError id="doctor-nombre-error" message={errors.nombre} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="apellido">
          Apellidos
        </label>
        <input
          type="text"
          id="apellido"
          className={inputClass(!!errors.apellido)}
          placeholder="Ingrese los apellidos del médico"
          value={apellido}
          onChange={(e) => {
            setApellido(e.target.value);
            clearError("apellido");
          }}
          required
          aria-invalid={!!errors.apellido}
          aria-describedby={
            errors.apellido ? "doctor-apellido-error" : undefined
          }
        />
        <FieldError id="doctor-apellido-error" message={errors.apellido} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="especialidad">
          Especialidad
        </label>
        <input
          type="text"
          id="especialidad"
          className={inputClass(!!errors.especialidad)}
          placeholder="Ingrese la especialidad del médico"
          value={especialidad}
          onChange={(e) => {
            setEspecialidad(e.target.value);
            clearError("especialidad");
          }}
          required
          aria-invalid={!!errors.especialidad}
          aria-describedby={
            errors.especialidad ? "doctor-especialidad-error" : undefined
          }
        />
        <FieldError
          id="doctor-especialidad-error"
          message={errors.especialidad}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="telefono">
          Teléfono
        </label>
        <input
          type="text"
          id="telefono"
          className={inputClass(!!errors.telefono)}
          placeholder="Ingrese el teléfono del médico"
          value={telefono}
          onChange={(e) => {
            setTelefono(e.target.value);
            clearError("telefono");
          }}
          required
          aria-invalid={!!errors.telefono}
          aria-describedby={
            errors.telefono ? "doctor-telefono-error" : undefined
          }
        />
        <FieldError id="doctor-telefono-error" message={errors.telefono} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="fecha_nacimiento">
          Fecha de Nacimiento
        </label>
        <input
          type="date"
          id="fecha_nacimiento"
          className={inputClass(!!errors.fechaNacimiento)}
          value={fechaNacimiento}
          onChange={(e) => {
            setFechaNacimiento(e.target.value);
            clearError("fechaNacimiento");
          }}
          max={todayISO()}
          required
          aria-invalid={!!errors.fechaNacimiento}
          aria-describedby={
            errors.fechaNacimiento ? "doctor-fecha-error" : undefined
          }
        />
        <FieldError id="doctor-fecha-error" message={errors.fechaNacimiento} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="genero">
          Género
        </label>
        <select
          id="genero"
          className={inputClass(!!errors.genero)}
          value={genero}
          onChange={(e) => {
            setGenero(e.target.value);
            clearError("genero");
          }}
          required
          aria-invalid={!!errors.genero}
          aria-describedby={errors.genero ? "doctor-genero-error" : undefined}
        >
          <option value="">Seleccione el género</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>
        <FieldError id="doctor-genero-error" message={errors.genero} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="direccion">
          Dirección
        </label>
        <input
          type="text"
          id="direccion"
          className={inputClass(!!errors.direccion)}
          placeholder="Ingrese la dirección del médico"
          value={direccion}
          onChange={(e) => {
            setDireccion(e.target.value);
            clearError("direccion");
          }}
          required
          aria-invalid={!!errors.direccion}
          aria-describedby={
            errors.direccion ? "doctor-direccion-error" : undefined
          }
        />
        <FieldError id="doctor-direccion-error" message={errors.direccion} />
      </div>
      {errorMessage && (
        <div
          role="alert"
          className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded"
        >
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
