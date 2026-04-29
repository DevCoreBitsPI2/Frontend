"use client";

import { useEffect, useState } from "react";

import LoadingSpinner from "@/components/LoadingSpinner";
import EditInfoModal from "@/components/perfil/EditInfoModal";
import UserProfileCard from "@/components/perfil/UserProfileCard";
import { obtenerPerfilUsuario, actualizarPerfilUsuario } from "@/services/profileService";
import { UserProfile } from "@/types/funcionario";

export default function PerfilUsuarioPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    obtenerPerfilUsuario()
      .then((perfil) => setUser(perfil))
      .catch(() => setError("No se pudo cargar el perfil de usuario."))
      .finally(() => setLoading(false));
  }, []);

  const handleSaveInfo = async (data: any) => {
    if (!user) return;

    const [nombre, ...restoNombre] = data.fullName?.trim().split(/\s+/) ?? [];
    const perfilActualizado: UserProfile = {
      ...user,
      nombre: nombre || user.nombre,
      apellidos: restoNombre.length > 0 ? restoNombre.join(" ") : user.apellidos,
      email: data.emailAddress || user.email,
      phone: data.phoneNumber || user.phone,
    };

    const perfilGuardado = await actualizarPerfilUsuario(perfilActualizado);
    setUser(perfilGuardado);
    setIsModalOpen(false);
  };

  if (loading) {
    return <LoadingSpinner mensaje="Cargando perfil de usuario..." />;
  }

  if (error || !user) {
    return (
      <div className="rounded-xl border border-rose-200 bg-white px-6 py-4 text-sm text-rose-500">
        {error || "No se pudo cargar el perfil de usuario."}
      </div>
    );
  }

  return (
    <>
      <UserProfileCard user={user} onEdit={() => setIsModalOpen(true)} />
      <EditInfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveInfo}
        initialData={{
          fullName: `${user.nombre} ${user.apellidos}`,
          emailAddress: user.email,
          phoneNumber: user.phone,
        }}
      />
    </>
  );
}