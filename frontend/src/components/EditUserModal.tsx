import { useEffect, useState } from "react";
import type { Paciente, Doctor, Admin, ExtendedUser } from "../models/models";
import { BsXCircleFill } from "react-icons/bs";
import { FieldError } from "./FieldError";
import { inputClass, isFutureDate, todayISO } from "../utils/validation";

interface EditUserModalProps {
  user: ExtendedUser;
  pacientes: Paciente[];
  doctors: Doctor[];
  admins: Admin[];
  onSave: (updated: ExtendedUser) => void;
  onClose: () => void;
}

type EditUserFieldErrors = {
  username?: string;
  nombre?: string;
  apellido?: string;
  fechaNacimiento?: string;
  genero?: string;
  telefono?: string;
  direccion?: string;
  especialidad?: string;
};

export function EditUserModal({ user, onSave, onClose }: EditUserModalProps) {
  const [username, setUsername] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [genero, setGenero] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [errors, setErrors] = useState<EditUserFieldErrors>({});
  const [isVisible, setIsVisible] = useState(false);

  const isDoctor = user.role === "DOCTOR";

  useEffect(() => {
    setUsername(user.username ?? "");
    setNombre(user.nombre ?? "");
    setApellido(user.apellido ?? "");
    setFechaNacimiento(user.fechaNacimiento ?? "");
    setGenero(user.genero ?? "");
    setTelefono(user.telefono ?? "");
    setDireccion(user.direccion ?? "");
    setEspecialidad(user.especialidad ?? "");
    setErrors({});

    // mostrar transición después de montar
    setTimeout(() => setIsVisible(true), 10);
  }, [user]);

  const clearError = (field: keyof EditUserFieldErrors) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): EditUserFieldErrors => {
    const next: EditUserFieldErrors = {};

    if (!username.trim()) {
      next.username = "El nombre de usuario es obligatorio.";
    }
    if (!nombre.trim()) {
      next.nombre = "El nombre es obligatorio.";
    }
    if (!apellido.trim()) {
      next.apellido = "El apellido es obligatorio.";
    }
    if (!fechaNacimiento) {
      next.fechaNacimiento = "La fecha de nacimiento es obligatoria.";
    } else if (isFutureDate(fechaNacimiento)) {
      next.fechaNacimiento = "La fecha de nacimiento no puede ser futura.";
    }
    if (!genero) {
      next.genero = "Selecciona un género.";
    }
    if (!telefono.trim()) {
      next.telefono = "El teléfono es obligatorio.";
    }
    if (!direccion.trim()) {
      next.direccion = "La dirección es obligatoria.";
    }
    if (isDoctor && !especialidad.trim()) {
      next.especialidad = "La especialidad es obligatoria.";
    }

    return next;
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300); // esperar a que termine la transición
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    let updated: ExtendedUser;
    switch (user.role) {
      case "ADMIN":
        updated = {
          ...user,
          username: username.trim(),
          nombre: nombre.trim(),
          apellido: apellido.trim(),
          fechaNacimiento,
          genero,
          telefono: telefono.trim(),
          direccion: direccion.trim(),
        };
        break;
      case "DOCTOR":
        updated = {
          ...user,
          username: username.trim(),
          nombre: nombre.trim(),
          apellido: apellido.trim(),
          fechaNacimiento,
          genero,
          telefono: telefono.trim(),
          direccion: direccion.trim(),
          especialidad: especialidad.trim(),
        };
        break;
      case "PACIENTE":
        updated = {
          ...user,
          username: username.trim(),
          nombre: nombre.trim(),
          apellido: apellido.trim(),
          fechaNacimiento,
          genero,
          telefono: telefono.trim(),
          direccion: direccion.trim(),
        };
        break;
      default:
        updated = { ...user, username: username.trim() };
    }

    onSave(updated);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 sm:items-start sm:pt-10 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <form
        className={`w-full max-w-md max-h-[90vh] mx-auto bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 flex flex-col ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Editar Usuario</h2>
          <button
            onClick={handleClose}
            className="text-red-600 hover:text-red-800"
            title="Cerrar"
            aria-label="Cerrar"
            type="button"
          >
            <BsXCircleFill size={24} />
          </button>
        </div>
        <div
          className="flex-1 overflow-y-auto px-6 pb-6
                     scrollbar scrollbar-thin
                     scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500
                     scrollbar-track-gray-200
                     scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
          style={{ scrollbarGutter: "stable both-edges" }}
        >
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Nombre de Usuario
            </label>
            <input
              type="text"
              id="username"
              className={inputClass(!!errors.username)}
              placeholder="Ingrese el nombre de usuario"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                clearError("username");
              }}
              required
              aria-invalid={!!errors.username}
              aria-describedby={
                errors.username ? "edit-username-error" : undefined
              }
            />
            <FieldError id="edit-username-error" message={errors.username} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="nombre">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              className={inputClass(!!errors.nombre)}
              placeholder="Ingrese el nombre"
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value);
                clearError("nombre");
              }}
              required
              aria-invalid={!!errors.nombre}
              aria-describedby={
                errors.nombre ? "edit-nombre-error" : undefined
              }
            />
            <FieldError id="edit-nombre-error" message={errors.nombre} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="apellido">
              Apellido
            </label>
            <input
              type="text"
              id="apellido"
              className={inputClass(!!errors.apellido)}
              placeholder="Ingrese el apellido"
              value={apellido}
              onChange={(e) => {
                setApellido(e.target.value);
                clearError("apellido");
              }}
              required
              aria-invalid={!!errors.apellido}
              aria-describedby={
                errors.apellido ? "edit-apellido-error" : undefined
              }
            />
            <FieldError id="edit-apellido-error" message={errors.apellido} />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 mb-2"
              htmlFor="fecha_nacimiento"
            >
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
                errors.fechaNacimiento ? "edit-fecha-error" : undefined
              }
            />
            <FieldError
              id="edit-fecha-error"
              message={errors.fechaNacimiento}
            />
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
                errors.genero ? "edit-genero-error" : undefined
              }
            >
              <option value="">Seleccione el género</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
            <FieldError id="edit-genero-error" message={errors.genero} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="telefono">
              Teléfono
            </label>
            <input
              type="text"
              id="telefono"
              className={inputClass(!!errors.telefono)}
              placeholder="Ingrese el número de teléfono"
              value={telefono}
              onChange={(e) => {
                setTelefono(e.target.value);
                clearError("telefono");
              }}
              required
              aria-invalid={!!errors.telefono}
              aria-describedby={
                errors.telefono ? "edit-telefono-error" : undefined
              }
            />
            <FieldError id="edit-telefono-error" message={errors.telefono} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="direccion">
              Dirección
            </label>
            <input
              type="text"
              id="direccion"
              className={inputClass(!!errors.direccion)}
              placeholder="Ingrese la dirección"
              value={direccion}
              onChange={(e) => {
                setDireccion(e.target.value);
                clearError("direccion");
              }}
              required
              aria-invalid={!!errors.direccion}
              aria-describedby={
                errors.direccion ? "edit-direccion-error" : undefined
              }
            />
            <FieldError id="edit-direccion-error" message={errors.direccion} />
          </div>
          {isDoctor && (
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2"
                htmlFor="especialidad"
              >
                Especialidad
              </label>
              <input
                type="text"
                id="especialidad"
                className={inputClass(!!errors.especialidad)}
                placeholder="Ingrese la especialización del doctor"
                value={especialidad}
                onChange={(e) => {
                  setEspecialidad(e.target.value);
                  clearError("especialidad");
                }}
                required
                aria-invalid={!!errors.especialidad}
                aria-describedby={
                  errors.especialidad ? "edit-especialidad-error" : undefined
                }
              />
              <FieldError
                id="edit-especialidad-error"
                message={errors.especialidad}
              />
            </div>
          )}
        </div>
        <div className="p-4 bg-white flex justify-end gap-2 shrink-0">
          <button
            type="button"
            className="mr-4 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            onClick={handleClose}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}
