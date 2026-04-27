"use client";

// app/dashboard/org-chart/page.tsx

import React, { useEffect, useState } from "react";
import { construirArbol, obtenerOrgChart } from "@/services/orgChartService";
import { NodoOrg } from "@/types/orgChart";
import OrgTree from "@/components/org-chart/OrgTree";
import AreaDetailsPanel from "@/components/org-chart/AreaDetailsPanel";
import { ChevronRight } from "lucide-react";

export default function PaginaOrgChart() {
  const [arbol, setArbol] = useState<any | null>(null);
  const [cargando, setCargando] = useState(true);
  const [nodoSeleccionado, setNodoSeleccionado] = useState<NodoOrg | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    obtenerOrgChart()
      .then((nodos) => {
        const arbolConstruido = construirArbol(nodos);
        setArbol(arbolConstruido);
      })
      .catch(() => setError("No se pudo cargar el organigrama."))
      .finally(() => setCargando(false));
  }, []);

  const manejarSeleccion = (nodo: NodoOrg) => {
    setNodoSeleccionado((prev) => (prev?.id === nodo.id ? null : nodo));
  };

  const cerrarPanel = () => setNodoSeleccionado(null);

  return (
    <div className="flex flex-col h-full w-full bg-[#ECEFF1]">
      {/* Barra superior con breadcrumb */}
      <header className="flex items-center px-6 py-3.5 bg-white border-b border-[#d1dde2] shrink-0">
        <nav className="flex items-center gap-1.5 text-xs text-[#8aa3ad]">
          <span className="hover:text-[#203D47] cursor-pointer transition-colors">
            Gestión de Talento
          </span>
          <ChevronRight size={12} className="text-[#c5d5db]" />
          <span className="text-[#0F1819] font-semibold">Organigrama</span>
        </nav>

        {/* Buscador */}
        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-2 bg-[#ECEFF1] rounded-lg px-3 py-1.5 text-xs text-[#8aa3ad] border border-[#d1dde2]">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="#8aa3ad" strokeWidth="1.5" />
              <path d="M11 11L14 14" stroke="#8aa3ad" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span>Buscar miembros...</span>
          </div>
        </div>
      </header>

      {/* Área principal del organigrama */}
      <main
        className="flex-1 relative overflow-hidden"
        style={{
          marginRight: nodoSeleccionado ? "300px" : 0,
          transition: "margin 0.2s ease-out",
        }}
      >
        {cargando && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-[#203D47] border-t-emerald-400 animate-spin" />
              <span className="text-xs text-[#8aa3ad]">Cargando organigrama…</span>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white rounded-xl px-6 py-4 shadow border border-rose-200 text-sm text-rose-500">
              {error}
            </div>
          </div>
        )}

        {!cargando && !error && arbol && (
          <OrgTree
            arbol={arbol}
            idSeleccionado={nodoSeleccionado?.id ?? null}
            alSeleccionar={manejarSeleccion}
          />
        )}
      </main>

      {/* Panel lateral de detalles */}
      <AreaDetailsPanel nodo={nodoSeleccionado} alCerrar={cerrarPanel} />
    </div>
  );
}