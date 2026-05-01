// services/recovery.ts

export interface RecoveryDTO {
  correo: string;
}

export async function enviarEnlaceRecuperacion(data: RecoveryDTO): Promise<void> {
  // Simulación — reemplazar con llamada real a Supabase
  await new Promise((r) => setTimeout(r, 800));

  // Simular error si el correo no existe
  if (!data.correo.includes("@")) {
    throw new Error("Correo inválido.");
  }
}