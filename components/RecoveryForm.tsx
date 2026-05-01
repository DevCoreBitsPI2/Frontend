// components/RecoveryForm.tsx
"use client";

import { useState } from "react";
import InputField from "@/components/InputField";
import AuthButton from "@/components/auth/AuthButton";
import { enviarEnlaceRecuperacion } from "@/services/recovery";
import Link from "next/link";

export default function RecoveryForm() {
  const [correo, setCorreo] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setCargando(true);

    try {
      await enviarEnlaceRecuperacion({ correo });
      setEnviado(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error. Intenta nuevamente.");
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow w-87.5 flex flex-col gap-4">
      {/* Volver al login */}
      <Link
        href="/login"
        className="text-xs text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1 w-fit"
      >
        ← Volver al login
      </Link>

      <div>
        <h2 className="text-lg font-semibold text-center text-gray-700">
          Recuperar cuenta
        </h2>
        <p className="text-xs text-gray-500 text-center mt-1">
          Ingresa tu correo registrado para recibir las instrucciones de recuperación.
        </p>
      </div>

      {/* Mensaje de éxito */}
      {enviado ? (
        <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm text-green-700 text-center">
          ¡Enlace enviado! Revisa tu correo electrónico.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <InputField
            label="Correo electrónico"
            placeholder="nombre@mail.com"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />

          {/* Mensaje de error */}
          {error && (
            <p className="text-xs text-red-500 text-center">{error}</p>
          )}

          <AuthButton text={cargando ? "Enviando..." : "Enviar enlace de recuperación"} />
        </form>
      )}
    </div>
  );
}