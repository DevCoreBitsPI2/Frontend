import { UserProfile } from "@/types/funcionario";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
const PROFILE_ENDPOINT = "/dashboard/perfil";

const MOCK_PROFILE: UserProfile = {
  idFuncionario: 9982,
  nombre: "Jonathan",
  apellidos: "Doe",
  cargo: "Senior Software Architect",
  area: "Engineering Department",
  email: "john.doe@company.com",
  phone: "+1 (555) 000-1234",
  fechaIngreso: "2019-03-01",
  ubicacion: "Austin, TX Office",
  foto: "",
  estado: "ACTIVO",
  fechaNacimiento: "1990-10-24",
  oficina: "New York Headquarters",
  reportaA: "Sarah Jenkins (Engineering Manager)",
};

async function solicitarPerfil(): Promise<UserProfile> {
  try {
    const response = await fetch(`${API_URL}${PROFILE_ENDPOINT}`, {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("No se pudo obtener el perfil");
    }

    return (await response.json()) as UserProfile;
  } catch {
    return MOCK_PROFILE;
  }
}

export async function obtenerPerfilUsuario(): Promise<UserProfile> {
  return solicitarPerfil();
}

export async function actualizarPerfilUsuario(
  perfil: UserProfile,
): Promise<UserProfile> {
  try {
    const response = await fetch(`${API_URL}${PROFILE_ENDPOINT}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(perfil),
    });

    if (!response.ok) {
      throw new Error("No se pudo actualizar el perfil");
    }

    return (await response.json()) as UserProfile;
  } catch {
    return perfil;
  }
}
