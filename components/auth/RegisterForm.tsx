"use client";

import { useEffect, useState } from "react";
import InputField from "../InputField";
import AuthButton from "./AuthButton";
import { registerUser, verificarInvitacion } from "@/services/register";
import { RegistroDTO } from "@/types/funcionario";
import { useSearchParams } from "next/navigation";

type InvitacionData = {
    correo: string;
    cargoId: number;
    cargoNombre: string;
};

export default function RegisterForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [loading, setLoading] = useState(true);

    // Datos de invitación
    const [invitacion, setInvitacion] = useState<InvitacionData | null>(null);

    // Datos del usuario
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        const fetchInvitacion = async () => {
            try {
                if (!token) return;

                const data = await verificarInvitacion(token);

                setInvitacion(data);
            } catch (error) {
                console.error("Invitación inválida", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInvitacion();
    }, [token]);

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!invitacion) return;

        if (password !== confirmPassword) {
            console.error("Las contraseñas no coinciden");
            return;
        }

        try {
            const data: RegistroDTO = {
                nombre,
                apellidos,
                correo: invitacion.correo,
                password,
                cargoId: invitacion.cargoId,
            };

            await registerUser(data);

            console.log("Usuario registrado correctamente");

        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return (
            <div className="bg-white p-8 rounded-xl shadow w-87.5 flex flex-col items-center justify-center gap-4">

                
                <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>

                
                <p className="text-sm text-gray-500">
                    Verificando invitación...
                </p>
            </div>
        );
    }

    if (!invitacion) {
        return <p className="text-red-500">Invitación inválida o expirada</p>;
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow w-[350px] flex flex-col gap-4"
        >
            <h2 className="text-lg font-semibold text-center text-gray-700">
                Completar registro
            </h2>

            {/* Nombre */}
            <InputField
                label="Nombre"
                placeholder="Juan"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />

            {/* Apellidos */}
            <InputField
                label="Apellidos"
                placeholder="Zuluaga"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
            />

            {/* Correo (bloqueado) */}
            <InputField
                label="Correo"
                value={invitacion.correo}
                onChange={() => { }}
                disabled
            />

            {/* Cargo (bloqueado) */}
            <InputField
                label="Cargo asignado"
                value={invitacion.cargoNombre}
                onChange={() => { }}
                disabled
            />

            {/* Password */}
            <InputField
                label="Contraseña"
                type="password"
                placeholder="Crea una contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {/* Confirm Password */}
            <InputField
                label="Confirmar contraseña"
                type="password"
                placeholder="Repite la contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <AuthButton text="Completar registro" />
        </form>
    );
}