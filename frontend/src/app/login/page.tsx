"use client";

import { useState, FormEvent } from "react";
import Button from "@/components/ui/Button";
import StatusBanner from "@/components/ui/StatusBanner";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Preparado para conexión futura con el backend
    try {
      // TODO: Conectar con POST /api/auth/login cuando el backend esté integrado
      setError(
        "El sistema de autenticación aún no está conectado. Esta pantalla se activará en una fase futura.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-fondo p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-acento tracking-tight">
            AppTEA
          </h1>
          <p className="mt-2 text-sm text-texto-suave">
            Aprende programación paso a paso
          </p>
        </div>

        <div className="card-duo p-6 sm:p-8">
          <header className="mb-6">
            <h2 className="text-lg font-bold text-principal">Iniciar sesión</h2>
            <p className="mt-1 text-sm text-texto-suave">
              Ingresa tu nombre de usuario y contraseña para acceder a los
              niveles.
            </p>
          </header>

          {error && (
            <div className="mb-4">
              <StatusBanner type="error" message={error} visible={true} />
            </div>
          )}

          {isLoading && (
            <div className="mb-4">
              <StatusBanner
                type="info"
                message="Procesando credenciales..."
                visible={true}
              />
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="mb-1.5 block text-sm font-bold text-principal"
              >
                Nombre de usuario
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                aria-required="true"
                required
                minLength={4}
                maxLength={20}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border-2 border-borde bg-fondo px-4 py-3 text-base text-principal focus-visible:outline-2 focus-visible:outline-resaltado focus-visible:outline-offset-2"
                title="Mínimo 4 caracteres. Solo letras, números y guiones bajos."
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-bold text-principal"
              >
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                aria-required="true"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border-2 border-borde bg-fondo px-4 py-3 text-base text-principal focus-visible:outline-2 focus-visible:outline-resaltado focus-visible:outline-offset-2"
                title="Mínimo 6 caracteres."
              />
            </div>

            <Button
              type="submit"
              aria-label="Iniciar sesión con las credenciales ingresadas"
              className="w-full"
            >
              Iniciar sesión
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
