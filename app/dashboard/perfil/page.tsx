"use client";

import { useState } from "react";

import EditInfoModal from "@/components/EditInfoModal";
import { UserProfileCard } from "@/components/UserProfileCard";

const mockUserData = {
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
  estado: "ACTIVO" as const,
  fechaNacimiento: "1990-10-24",
  oficina: "New York Headquarters",
  reportaA: "Sarah Jenkins (Engineering Manager)",
};

export default function PerfilUsuarioPage() {
  const [user, setUser] = useState(mockUserData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveInfo = async (data: any) => {
    setUser((prev) => ({
      ...prev,
      nombre: data.fullName?.split(" ")[0] || prev.nombre,
      apellidos: data.fullName?.split(" ").slice(1).join(" ") || prev.apellidos,
      email: data.emailAddress || prev.email,
      phone: data.phoneNumber || prev.phone,
    }));
    setIsModalOpen(false);
  };

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