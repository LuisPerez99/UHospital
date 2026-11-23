import { Link, useNavigate } from "react-router";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import type { User, Paciente, Doctor, Admin } from "../models/models";
import { useAuth } from "../contexts/AuthContext";
import { FieldError } from "./FieldError";
import { inputClass, isValidEmail } from "../utils/validation";

interface LoginFormProps {
  users: User[];
  pacientes: Paciente[];
  doctors: Doctor[];
  admins: Admin[];
}

type LoginFieldErrors = {
  email?: string;
  password?: string;
};

export function LoginForm({ users, pacientes, doctors, admins }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginFieldErrors>({});
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();
  const { login, user, authenticate } = useAuth();

  const validate = (): LoginFieldErrors => {
    const next: LoginFieldErrors = {};

    if (!email.trim()) {
      next.email = "El correo electrónico es obligatorio.";
    } else if (!isValidEmail(email)) {
      next.email = "Ingresa un correo electrónico válido.";
    }

    if (!password) {
      next.password = "La contraseña es obligatoria.";
    }

    return next;
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginError(false);

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    try {
      const foundUser = authenticate(
        email.trim(),
        password,
        users,
        pacientes,
        doctors,
        admins
      );
      if (foundUser && (foundUser.active ?? true)) {
        login(foundUser);
      } else {
        setLoginError(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setErrors((prev) => ({ ...prev, email: undefined }));
    setLoginError(false);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setErrors((prev) => ({ ...prev, password: undefined }));
    setLoginError(false);
  };

  const emailDescribedBy =
    [errors.email ? "login-email-error" : null, loginError ? "login-credentials-error" : null]
      .filter(Boolean)
      .join(" ") || undefined;

  const passwordDescribedBy =
    [errors.password ? "login-password-error" : null, loginError ? "login-credentials-error" : null]
      .filter(Boolean)
      .join(" ") || undefined;

  useEffect(() => {
    if (user) {
      if (user.role === "ADMIN") {
        navigate("/dashboard/admin");
        return;
      }
      if (user.role === "DOCTOR") {
        navigate("/dashboard/doctor");
        return;
      }
      if (user.role === "PACIENTE") {
        navigate("/dashboard/paciente");
        return;
      }
    }
  }, [user, navigate]);

  return (
    <>
      <form
        className="max-w-md mx-auto mt-8 p-4 border border-gray-300 rounded"
        noValidate
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            className={inputClass(!!errors.email || loginError)}
            placeholder="Ingrese su correo electrónico"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            required
            aria-invalid={!!errors.email || loginError}
            aria-describedby={emailDescribedBy}
          />
          <FieldError id="login-email-error" message={errors.email} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Contraseña
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className={`${inputClass(!!errors.password || loginError)} pr-10`}
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              required
              aria-invalid={!!errors.password || loginError}
              aria-describedby={passwordDescribedBy}
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
          <FieldError id="login-password-error" message={errors.password} />
        </div>
        {loginError && (
          <div
            id="login-credentials-error"
            role="alert"
            className="mb-4 p-3 border border-red-500 bg-red-100 text-red-700 rounded"
          >
            El correo o la contraseña ingresados son incorrectos
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
        >
          Iniciar Sesión
        </button>
      </form>
      <p className="text-center mt-4">
        ¿No tienes una cuenta?{" "}
        <Link to="/registro" className="text-blue-600 hover:underline">
          Crear una cuenta nueva
        </Link>
      </p>
      <p className="text-center mt-4">
        ¿Olvidaste tu contraseña?{" "}
        <Link to="/reset-password" className="text-blue-600 hover:underline">
          Restablecer contraseña
        </Link>
      </p>
    </>
  );
}
