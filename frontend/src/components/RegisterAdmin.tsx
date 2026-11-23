import { useState } from "react";
import type { User, Admin } from "../models/models";
import { users, admins } from "../data/users";
import { FieldError } from "./FieldError";
import {
  inputClass,
  isFutureDate,
  todayISO,
  type RegisterFieldErrors,
} from "../utils/validation";

interface RegisterAdminProps {
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

type AdminFieldErrors = {
  nombre?: string;
  apellido?: string;
  telefono?: string;
  fechaNacimiento?: string;
  genero?: string;
  direccion?: string;
};

export function RegisterAdmin({
  username,
  onUsernameChange,
  email,
  onEmailChange,
  password,
  onPasswordChange,
  onConfirmPasswordChange,
  validateSharedFields,
  onSharedFieldError,
}: RegisterAdminProps) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [direccion, setDireccion] = useState("");
  const [genero, setGenero] = useState("");
  const [errors, setErrors] = useState<AdminFieldErrors>({});
  const [errorMessage, setErrorMessage] = useState("");

  const clearError = (field: keyof AdminFieldErrors) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): AdminFieldErrors => {
    const next: AdminFieldErrors = {};

    if (!nombre.trim()) {
      next.nombre = "Los nombres son obligatorios.";
    }
    if (!apellido.trim()) {
      next.apellido = "Los apellidos son obligatorios.";
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
      role: "ADMIN",
    };

    const admin: Admin = {
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      email: user.email,
      telefono: telefono.trim(),
      fecha_nacimiento: fechaNacimiento,
      genero: genero,
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

      users.push(user);
      admins.push(admin);

      alert("Administrador registrado exitosamente");

      setNombre("");
      setApellido("");
      setTelefono("");
      setFechaNacimiento("");
      setGenero("");
      setDireccion("");
      setErrors({});
      setErrorMessage("");
      onUsernameChange("");
      onEmailChange("");
      onPasswordChange("");
      onConfirmPasswordChange("");
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
          placeholder="Ingrese los nombres del administrador"
          value={nombre}
          onChange={(e) => {
            setNombre(e.target.value);
            clearError("nombre");
          }}
          required
          aria-invalid={!!errors.nombre}
          aria-describedby={errors.nombre ? "admin-nombre-error" : undefined}
        />
        <FieldError id="admin-nombre-error" message={errors.nombre} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="apellido">
          Apellidos
        </label>
        <input
          type="text"
          id="apellido"
          className={inputClass(!!errors.apellido)}
          placeholder="Ingrese los apellidos del administrador"
          value={apellido}
          onChange={(e) => {
            setApellido(e.target.value);
            clearError("apellido");
          }}
          required
          aria-invalid={!!errors.apellido}
          aria-describedby={
            errors.apellido ? "admin-apellido-error" : undefined
          }
        />
        <FieldError id="admin-apellido-error" message={errors.apellido} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="telefono">
          Teléfono
        </label>
        <input
          type="text"
          id="telefono"
          className={inputClass(!!errors.telefono)}
          placeholder="Ingrese el teléfono del administrador"
          value={telefono}
          onChange={(e) => {
            setTelefono(e.target.value);
            clearError("telefono");
          }}
          required
          aria-invalid={!!errors.telefono}
          aria-describedby={
            errors.telefono ? "admin-telefono-error" : undefined
          }
        />
        <FieldError id="admin-telefono-error" message={errors.telefono} />
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
            errors.fechaNacimiento ? "admin-fecha-error" : undefined
          }
        />
        <FieldError id="admin-fecha-error" message={errors.fechaNacimiento} />
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
          aria-describedby={errors.genero ? "admin-genero-error" : undefined}
        >
          <option value="">Seleccione el género</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>
        <FieldError id="admin-genero-error" message={errors.genero} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="direccion">
          Dirección
        </label>
        <input
          type="text"
          id="direccion"
          className={inputClass(!!errors.direccion)}
          placeholder="Ingrese la dirección del administrador"
          value={direccion}
          onChange={(e) => {
            setDireccion(e.target.value);
            clearError("direccion");
          }}
          required
          aria-invalid={!!errors.direccion}
          aria-describedby={
            errors.direccion ? "admin-direccion-error" : undefined
          }
        />
        <FieldError id="admin-direccion-error" message={errors.direccion} />
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
        Registrar Administrador
      </button>
    </>
  );
}
