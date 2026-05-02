import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export async function updatePassword(password: string) {
  // 1. Actualizar contraseña
  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) throw error;

  // 2. Obtener usuario actual
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  if (!user) throw new Error("Usuario no encontrado");

  // 3. Llamar backend para limpiar flag
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

  const res = await fetch(
    `${apiUrl}/employees/completeFirstLogin/${user.id}`,
    {
      method: "PATCH",
    }
  );

  if (!res.ok) {
    throw new Error("Error actualizando estado de primer login" + await res.text());
  }
}