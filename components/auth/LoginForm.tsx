"use client";

import { useState } from "react";
import AccessLevelToggle from "./AccessLevelToggle";
import InputField from "../InputField";
import AuthButton from "./AuthButton";
import { loginUser } from "@/services/login";

export default function LoginForm() {
    const [role, setRole] = useState("user");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        await loginUser({
            email,
            password,
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow w-[350px] flex flex-col gap-4"
        >
            <h2 className="text-lg font-semibold text-center text-gray-700">Inicia sesión</h2>

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