"use client";

// app/dashboard/areas/page.tsx

import React, { useEffect, useState } from "react";
import { Area, obtenerAreas, eliminarArea } from "@/services/areasService";
import AreasTable from "@/components/areas/AreasTable";
import NewAreaModal from "@/components/areas/NewAreaModal";
import { ChevronRight, Plus } from "lucide-react";

export default function PaginaAreas() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cargarAreas = async () => {
    setCargando(true);
    try {
      const datos = await obtenerAreas();
      setAreas(datos);
    } catch {
      setError("No se pudieron cargar las areas.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => { cargarAreas(); }, []);

  const manejarEliminar = async (id: string) => {
    if (!confirm("¿Estas seguro de que deseas eliminar esta area?")) return;
    await eliminarArea(id);
    await cargarAreas();
  };

  const manejarVer = (area: Area) => {
    alert(`Ver detalles de: ${area.nombre}`);
  };

  const manejarEditar = (area: Area) => {
    alert(`Editar area: ${area.nombre}`);
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#f4f7f8]">
      {/* Barra superior con breadcrumb */}
      <header className="flex items-center justify-between px-6 py-3.5 bg-white border-b border-[#d1dde2] shrink-0">
        <nav className="flex items-center gap-1.5 text-xs text-[#8aa3ad]">
          <span className="hover:text-[#203D47] cursor-pointer transition-colors">Dashboard</span>
          <ChevronRight size={12} className="text-[#c5d5db]" />
          <span className="hover:text-[#203D47] cursor-pointer transition-colors">Estructura Organizacional</span>
          <ChevronRight size={12} className="text-[#c5d5db]" />
          <span className="text-[#0F1819] font-semibold">Areas</span>
        </nav>
      </header>

      {/* Contenido principal */}
      <main className="flex-1 px-6 py-6 overflow-auto">
        {/* Titulo y boton */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-[#0F1819]">Gestion de Areas</h1>
            <p className="text-sm text-[#8aa3ad] mt-0.5">
              Define y administra los departamentos y unidades de negocio de la organizacion.
            </p>
          </div>
          <button
            onClick={() => setMostrarModal(true)}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shrink-0"
          >
            <Plus size={15} />
            Nueva Area
          </button>
        </div>

        {/* Estado de carga */}
        {cargando && (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-[#203D47] border-t-emerald-400 animate-spin" />
              <span className="text-xs text-[#8aa3ad]">Cargando areas...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-white rounded-xl px-6 py-4 border border-rose-200 text-sm text-rose-500">
            {error}
          </div>
        )}

        {!cargando && !error && (
          <AreasTable
            areas={areas}
            onVer={manejarVer}
            onEditar={manejarEditar}
            onEliminar={manejarEliminar}
          />
        )}
      </main>

      {/* Modal nueva area */}
      {mostrarModal && (
        <NewAreaModal
          onCerrar={() => setMostrarModal(false)}
          onCreada={async () => {
            setMostrarModal(false);
            await cargarAreas();
          }}
        />
      )}
    </div>
  );
}