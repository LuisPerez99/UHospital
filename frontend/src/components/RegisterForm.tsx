import { Link } from "react-router";
import { RegisterDoctor } from "./RegisterDoctor";
import { useState } from "react";
import { RegisterAdmin } from "./RegisterAdmin";
import { RegisterPaciente } from "./RegisterPaciente";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { FieldError } from "./FieldError";
import {
  inputClass,
  isValidEmail,
  MIN_PASSWORD_LENGTH,
  type RegisterFieldErrors,
} from "../utils/validation";

export function RegisterForm() {
  const [selectedRole, setSelectedRole] = useState("DOCTOR");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<RegisterFieldErrors>({});

  let loggedInUser: { role?: string } | null = null;
  try {
    const storedUser = localStorage.getItem("loggedInUser");
    loggedInUser = storedUser ? JSON.parse(storedUser) : null;
  } catch {
    loggedInUser = null;
  }
  const isAdmin = loggedInUser?.role === "ADMIN";

  const setSharedFieldError = (
    field: keyof RegisterFieldErrors,
    message?: string
  ) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const validateSharedFields = (): RegisterFieldErrors => {
    const next: RegisterFieldErrors = {};

    if (!username.trim()) {
      next.username = "El nombre de usuario es obligatorio.";
    }

    if (!email.trim()) {
      next.email = "El correo electrónico es obligatorio.";
    } else if (!isValidEmail(email)) {
      next.email = "Ingresa un correo electrónico válido.";
    }

    if (!password) {
      next.password = "La contraseña es obligatoria.";
    } else if (password.length < MIN_PASSWORD_LENGTH) {
      next.password = `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`;
    }

    if (!confirmPassword) {
      next.confirmPassword = "Confirma la contraseña.";
    } else if (password !== confirmPassword) {
      next.confirmPassword = "Las contraseñas no coinciden.";
    }

    setErrors(next);
    return next;
  };

  return (
    <>
      <form
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
        noValidate
        onSubmit={(e) => e.preventDefault()}
      >
        <h2 className="text-2xl font-bold mb-4">Crear una Cuenta</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="username">
            Nombre de Usuario
          </label>
          <input
            type="text"
            id="username"
            className={inputClass(!!errors.username)}
            placeholder="Ingrese su nombre de usuario"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setSharedFieldError("username");
            }}
            required
            aria-invalid={!!errors.username}
            aria-describedby={errors.username ? "register-username-error" : undefined}
          />
          <FieldError id="register-username-error" message={errors.username} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            className={inputClass(!!errors.email)}
            placeholder="Ingrese su correo electrónico"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setSharedFieldError("email");
            }}
            required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "register-email-error" : undefined}
          />
          <FieldError id="register-email-error" message={errors.email} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Contraseña
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className={`${inputClass(!!errors.password)} pr-10`}
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setSharedFieldError("password");
                setSharedFieldError("confirmPassword");
              }}
              required
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "register-password-error" : undefined}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
            </button>
          </div>
          <FieldError id="register-password-error" message={errors.password} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
            Confirmar Contraseña
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              className={`${inputClass(!!errors.confirmPassword)} pr-10`}
              placeholder="Confirme su contraseña"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setSharedFieldError("confirmPassword");
              }}
              required
              aria-invalid={!!errors.confirmPassword}
              aria-describedby={
                errors.confirmPassword ? "register-confirm-password-error" : undefined
              }
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label={
                showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"
              }
            >
              {showConfirmPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
            </button>
          </div>
          <FieldError
            id="register-confirm-password-error"
            message={errors.confirmPassword}
          />
        </div>
        {isAdmin && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="role">
              Rol
            </label>
            <select
              id="role"
              value={selectedRole}
              onChange={(e) => {
                setSelectedRole(e.target.value);
                setErrors({});
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            >
              <option value="DOCTOR">Doctor</option>
              <option value="ADMIN">Administrador</option>
              <option value="PACIENTE">Paciente</option>
            </select>
          </div>
        )}
        {isAdmin && selectedRole === "DOCTOR" && (
          <RegisterDoctor
            username={username}
            onUsernameChange={setUsername}
            email={email}
            onEmailChange={setEmail}
            password={password}
            onPasswordChange={setPassword}
            onConfirmPasswordChange={setConfirmPassword}
            validateSharedFields={validateSharedFields}
            onSharedFieldError={setSharedFieldError}
          />
        )}
        {isAdmin && selectedRole === "ADMIN" && (
          <RegisterAdmin
            username={username}
            onUsernameChange={setUsername}
            email={email}
            onEmailChange={setEmail}
            password={password}
            onPasswordChange={setPassword}
            onConfirmPasswordChange={setConfirmPassword}
            validateSharedFields={validateSharedFields}
            onSharedFieldError={setSharedFieldError}
          />
        )}
        {(!loggedInUser || (isAdmin && selectedRole === "PACIENTE")) && (
          <RegisterPaciente
            username={username}
            onUsernameChange={setUsername}
            email={email}
            onEmailChange={setEmail}
            password={password}
            onPasswordChange={setPassword}
            onConfirmPasswordChange={setConfirmPassword}
            validateSharedFields={validateSharedFields}
            onSharedFieldError={setSharedFieldError}
          />
        )}
      </form>
      {!loggedInUser && (
        <p className="text-center mt-4">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Iniciar Sesión
          </Link>
        </p>
      )}
    </>
  );
}
