import { useState } from "react";
import { FieldError } from "../components/FieldError";
import { inputClass, isValidEmail } from "../utils/validation";

export function ResetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(false);

    if (!email.trim()) {
      setError("El correo electrónico es obligatorio.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Ingresa un correo electrónico válido.");
      return;
    }

    setError(undefined);
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Restablecer Contraseña</h2>
        <form noValidate onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              className={inputClass(!!error)}
              placeholder="Ingresa tu correo electrónico"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(undefined);
                setSubmitted(false);
              }}
              required
              aria-invalid={!!error}
              aria-describedby={error ? "reset-email-error" : undefined}
            />
            <FieldError id="reset-email-error" message={error} />
          </div>
          {submitted && (
            <p
              role="status"
              className="mb-4 p-3 bg-blue-50 border border-blue-300 text-blue-700 rounded"
            >
              La recuperación de contraseña aún no está disponible.
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Enviar Instrucciones
          </button>
        </form>
      </div>
    </div>
  );
}
