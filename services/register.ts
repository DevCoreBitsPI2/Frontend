import { RegistroDTO } from "@/types/funcionario";

// Verificación de la invitación que irá como token en la URL.

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const registerUser = async (data: RegistroDTO) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const res = await fetch(`${apiUrl}employees/inviteUser`, {
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


