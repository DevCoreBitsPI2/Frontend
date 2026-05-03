"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AccessLevelToggle from "./AccessLevelToggle";
import InputField from "../InputField";
import AuthButton from "./AuthButton";
import { loginUser } from "@/services/login";
import { toast } from "react-hot-toast";

export default function LoginForm() {
  const router = useRouter();

  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 🔍 Validaciones antes de pegarle al backend
    if (!email) {
      toast.error("Por favor ingresa tu correo electrónico");
      return;
    }

    if (!password) {
      toast.error("Por favor ingresa tu contraseña");
      return;
    }

    try {
      const data = await loginUser({ email, password });

      const user = data.user;

      const mustSetPassword = user?.app_metadata?.mustSetPassword;

      if (mustSetPassword) {
        toast("Debes configurar tu contraseña primero", { icon: "⚠️" });
        router.push("/signup");
        return;
      }

      // ✔ login normal
      toast.success("Bienvenido 👋");
      router.push("/dashboard");

    } catch (error: any) {
      console.error(error.message);

      // 🎯 Manejo de errores bonito
      const mensaje = error.message?.toLowerCase();

      if (mensaje?.includes("invalid login credentials")) {
        toast.error("Correo o contraseña incorrectos");
      } else if (mensaje?.includes("user not found")) {
        toast.error("El usuario no existe");
      } else if (mensaje?.includes("email")) {
        toast.error("Correo inválido o faltante");
      } else {
        toast.error("Ocurrió un error al iniciar sesión");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl shadow w-[350px] flex flex-col gap-4"
    >
      <h2 className="text-lg font-semibold text-center text-gray-700">
        Inicia sesión
      </h2>

      <div>
        <p className="text-xs text-gray-500 mb-1">Tipo de Login.</p>
        <AccessLevelToggle value={role} onChange={setRole} />
      </div>

      <InputField
        label="Correo electrónico"
        placeholder="nombre@mail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <InputField
        label="Contraseña"
        type="password"
        placeholder="Ingresa tu contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="text-right text-xs text-gray-500 cursor-pointer">
        ¿Olvidaste tu contraseña?
      </div>

      <AuthButton text="Iniciar sesión" />
    </form>
  );
}