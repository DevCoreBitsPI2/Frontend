import { RegistroDTO } from "@/types/funcionario";

// Verificación de la invitación que irá como token en la URL.
 /* export const verificarInvitacion = async (token: string) => {
  const res = await fetch(
    `http://localhost:3000/auth/verificar-invitacion?token=${token}`
  );

  if (!res.ok) {
    throw new Error("Invitación inválida");
  }

  return res.json();
}; */

export const verificarInvitacion = async (token: string) => {

  // Simulación token
  if (token === "mock-token-123") {
    return {
      correo: "juan.zuluaga@empresa.com",
      cargoId: 2,
      cargoNombre: "Desarrollador Backend",
    };
  }

  throw new Error("Invitación inválida");
};


export const registerUser = async (data: RegistroDTO) => {
  const res = await fetch("http://localhost:3000/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error al registrar usuario");
  }

  return res.json();
};