"use client";

import { useEffect, useState } from "react";
import InputField from "../InputField";
import AuthButton from "./AuthButton";
import LoadingSpinner from "../LoadingSpinner";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { checkFirstLogin } from "@/services/firstLogin";
import { updatePassword } from "@/services/passwordFirstTime";
export default function RegisterForm() {
  const supabase = createClient();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 🔥 DEBUG
  const [debug, setDebug] = useState<any>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);

        const accessToken = params.get("access_token");
        const refreshToken = params.get("refresh_token");

        if (!accessToken || !refreshToken) {
          setLoading(false);
          return;
        }

        // 1. Crear sesión
        await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        // 2. Obtener usuario
        const { data } = await supabase.auth.getUser();
        const user = data.user;

        if (!user) throw new Error("Usuario no encontrado");

        // 3. Validar primer login
        const result = await checkFirstLogin(user.id);

        // 🔥 GUARDAR DEBUG
        setDebug(result);

        // 🔥 Soporta ambos formatos:
        const isFirstLogin =
          typeof result === "boolean"
            ? result
            : result?.isFirstLogin;

        if (!isFirstLogin) {
          router.push("/login");
          return;
        }

        setAllowed(true);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error("Las contraseñas no coinciden");
      return;
    }

    try {
      
        await updatePassword(password);

      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (!allowed)
    return (
      <div className="text-center">
        <p>No autorizado</p>
      </div>
    );

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl shadow w-[350px] flex flex-col gap-4"
    >
      <h2 className="text-lg font-semibold text-center text-gray-700">
        Definir contraseña
      </h2>

      <InputField
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <InputField
        label="Confirmar contraseña"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <AuthButton text="Guardar contraseña" />

      
    </form>
  );
}