import { Link } from "react-router";
import { useConfig } from "../contexts/ConfigContext";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useState } from "react";

export function LoginForm() {
  const { baseURL } = useConfig();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`${baseURL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (response.ok) {
        alert("Inicio de sesión exitoso");
        // Guardar el token en el almacenamiento local
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("tokenExp", data.expires_at);
        localStorage.setItem("userRole", data.role);
        localStorage.setItem("userEmail", data.email);
        // Redirigir al usuario a la página principal u otra página protegida
        window.location.href = "/";
      } else {
        response.json().then((data) => {
          if (data.error) {
            alert(`Error en el inicio de sesión: ${data.error}`);
          } else {
            alert("Error en el inicio de sesión");
          }
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
            className="w-full px-3 py-2 border border-gray-300 rounded"
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
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
    </>
  );
}
