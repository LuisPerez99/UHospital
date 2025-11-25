import { Link, useNavigate } from "react-router";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import type { User } from "../models/models";
import { useAuth } from "../contexts/AuthContext";

interface LoginFormProps {
  users: User[];
}

export function LoginForm({ users }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, user, authenticate } = useAuth();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const foundUser = authenticate(email, password, users);
      if (foundUser && foundUser.active) {
        login(foundUser);
      } else {
        setLoginError(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
      if (user.role === "PATIENT") {
        navigate("/dashboard/patient");
        return;
      }
    }
  }, [user, navigate]);

  return (
    <>
      <form className="max-w-md mx-auto mt-8 p-4 border border-gray-300 rounded">
        <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            className={`w-full px-3 py-2 border ${loginError ? "border-red-500 text-red-700" : "border-gray-300"} rounded`}
            placeholder="Ingrese su correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              className={`w-full px-3 py-2 border ${loginError ? "border-red-500 text-red-700" : "border-gray-300"} rounded`}
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute right-2 top-1/2 -translate-y-1/2 ${loginError ? "text-red-700" : "text-gray-500"} hover:${loginError ? "text-red-700" : "text-gray-700"}`}
            >
              {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
          onClick={handleLogin}
        >
          Iniciar Sesión
        </button>
      </form>
      <p className="text-center mt-4">
        ¿No tienes una cuenta?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Crear una cuenta nueva
        </Link>
      </p>
      <p className="text-center mt-4">
        ¿Olvidaste tu contraseña?{" "}
        <Link to="/reset-password" className="text-blue-600 hover:underline">
          Restablecer contraseña
        </Link>
      </p>
      {loginError && (
        <div className="max-w-md mx-auto mt-4 p-4 border border-red-500 bg-red-100 text-red-700 rounded">
          Correo electrónico o contraseña incorrectos, o la cuenta está inactiva.
        </div>
      )}
    </>
  );
}
