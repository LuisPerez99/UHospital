import type { User, Paciente } from "../models/models";
import { useState } from "react";
import { users, pacientes } from "../data/users";
import { useNavigate } from "react-router";
import { FieldError } from "./FieldError";
import {
  inputClass,
  isFutureDate,
  todayISO,
  type RegisterFieldErrors,
} from "../utils/validation";

interface RegisterPacienteProps {
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

type PacienteFieldErrors = {
  nombre?: string;
  apellido?: string;
  genero?: string;
  fechaNacimiento?: string;
  telefono?: string;
  direccion?: string;
};

export function RegisterPaciente({
  username,
  onUsernameChange,
  email,
  onEmailChange,
  password,
  onPasswordChange,
  onConfirmPasswordChange,
  validateSharedFields,
  onSharedFieldError,
}: RegisterPacienteProps) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [genero, setGenero] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [errors, setErrors] = useState<PacienteFieldErrors>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const navigate = useNavigate();

  const clearError = (field: keyof PacienteFieldErrors) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): PacienteFieldErrors => {
    const next: PacienteFieldErrors = {};

    if (!nombre.trim()) {
      next.nombre = "Los nombres son obligatorios.";
    }
    if (!apellido.trim()) {
      next.apellido = "Los apellidos son obligatorios.";
    }
    if (!genero) {
      next.genero = "Selecciona un género.";
    }
    if (!fechaNacimiento) {
      next.fechaNacimiento = "La fecha de nacimiento es obligatoria.";
    } else if (isFutureDate(fechaNacimiento)) {
      next.fechaNacimiento = "La fecha de nacimiento no puede ser futura.";
    }
    if (!telefono.trim()) {
      next.telefono = "El teléfono es obligatorio.";
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
      id: 0,
      username: username.trim(),
      email: normalizedEmail,
      password: password,
      role: "PACIENTE",
    };

    const paciente: Paciente = {
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      email: user.email,
      fecha_nacimiento: fechaNacimiento,
      genero: genero,
      telefono: telefono.trim(),
      direccion: direccion.trim(),
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
      setGenero("");
      setTelefono("");
      setDireccion("");
      setErrors({});
      setErrorMessage("");
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
          placeholder="Ingrese los nombres del paciente"
          value={nombre}
          onChange={(e) => {
            setNombre(e.target.value);
            clearError("nombre");
          }}
          required
          aria-invalid={!!errors.nombre}
          aria-describedby={errors.nombre ? "paciente-nombre-error" : undefined}
        />
        <FieldError id="paciente-nombre-error" message={errors.nombre} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="apellido">
          Apellidos
        </label>
        <input
          type="text"
          id="apellido"
          className={inputClass(!!errors.apellido)}
          placeholder="Ingrese los apellidos del paciente"
          value={apellido}
          onChange={(e) => {
            setApellido(e.target.value);
            clearError("apellido");
          }}
          required
          aria-invalid={!!errors.apellido}
          aria-describedby={
            errors.apellido ? "paciente-apellido-error" : undefined
          }
        />
        <FieldError id="paciente-apellido-error" message={errors.apellido} />
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
          aria-describedby={
            errors.genero ? "paciente-genero-error" : undefined
          }
        >
          <option value="">Seleccione el género</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>
        <FieldError id="paciente-genero-error" message={errors.genero} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="telefono">
          Teléfono
        </label>
        <input
          type="text"
          id="telefono"
          className={inputClass(!!errors.telefono)}
          placeholder="Ingrese el teléfono del paciente"
          value={telefono}
          onChange={(e) => {
            setTelefono(e.target.value);
            clearError("telefono");
          }}
          required
          aria-invalid={!!errors.telefono}
          aria-describedby={
            errors.telefono ? "paciente-telefono-error" : undefined
          }
        />
        <FieldError id="paciente-telefono-error" message={errors.telefono} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="direccion">
          Dirección
        </label>
        <input
          type="text"
          id="direccion"
          className={inputClass(!!errors.direccion)}
          placeholder="Ingrese la dirección del paciente"
          value={direccion}
          onChange={(e) => {
            setDireccion(e.target.value);
            clearError("direccion");
          }}
          required
          aria-invalid={!!errors.direccion}
          aria-describedby={
            errors.direccion ? "paciente-direccion-error" : undefined
          }
        />
        <FieldError id="paciente-direccion-error" message={errors.direccion} />
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
            errors.fechaNacimiento ? "paciente-fecha-error" : undefined
          }
        />
        <FieldError
          id="paciente-fecha-error"
          message={errors.fechaNacimiento}
        />
      </div>
      {errorMessage && (
        <div
          role="alert"
          className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded"
        >
          {errorMessage}
        </div>
      )}
      {registerSuccess && (
        <div
          role="status"
          className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded"
        >
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
