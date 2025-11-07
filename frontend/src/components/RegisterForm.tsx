import { Link } from "react-router";
import { RegisterDoctor } from "./RegisterDoctor";
import { useState } from "react";
import { RegisterAdmin } from "./RegisterAdmin";
import { RegisterPaciente } from "./RegisterPaciente";
import type { User } from "../models/models";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

export function RegisterForm() {
  const [selectedRole, setSelectedRole] = useState("DOCTOR");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    password: "",
    role: selectedRole,
  });

  return (
    <>
      <form className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Crear una Cuenta</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="username">
            Nombre de Usuario
          </label>
          <input
            type="text"
            id="username"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Ingrese su nombre de usuario"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            className={`w-full px-3 py-2 border border-gray-300 rounded ${
              emailError ? "border-red-500 text-red-700" : "border-gray-300"
            }`}
            placeholder="Ingrese su correo electrónico"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Contraseña
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className={`w-full px-3 py-2 border rounded pr-10 ${
                passwordError
                  ? "border-red-500 text-red-700"
                  : "border-gray-300"
              }`}
              placeholder="Ingrese su contraseña"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
            Confirmar Contraseña
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              className={`w-full px-3 py-2 border border-gray-300 rounded pr-10 ${
                passwordError
                  ? "border-red-500 text-red-700"
                  : "border-gray-300"
              }`}
              placeholder="Confirme su contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
            </button>
          </div>
        </div>
        {localStorage.getItem("userRole") === "ADMIN" && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="role">
              Rol
            </label>
            <select
              id="role"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            >
              <option value="DOCTOR">Doctor</option>
              <option value="ADMIN">Administrador</option>
            </select>
          </div>
        )}
        {localStorage.getItem("userRole") === "ADMIN" &&
          selectedRole === "DOCTOR" && (
            <RegisterDoctor
              user={user}
              confirmPassword={confirmPassword}
              emailError={emailError}
              passwordError={passwordError}
              onEmailError={setEmailError}
              onPasswordError={setPasswordError}
            />
          )}
        {localStorage.getItem("userRole") === "ADMIN" &&
          selectedRole === "ADMIN" && (
            <RegisterAdmin
              user={user}
              confirmPassword={confirmPassword}
              emailError={emailError}
              passwordError={passwordError}
              onEmailError={setEmailError}
              onPasswordError={setPasswordError}
            />
          )}
        {localStorage.getItem("userRole") !== "ADMIN" && (
          <RegisterPaciente
            user={user}
            confirmPassword={confirmPassword}
            emailError={emailError}
            passwordError={passwordError}
            onEmailError={setEmailError}
            onPasswordError={setPasswordError}
          />
        )}
      </form>
      <p className="text-center mt-4">
        ¿Ya tienes una cuenta?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Iniciar Sesión
        </Link>
      </p>
    </>
  );
}
