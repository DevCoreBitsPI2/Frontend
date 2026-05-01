"use client";

// components/org-chart/AreaDetailsPanel.tsx

import React from "react";
import { NodoOrg } from "@/types/orgChart";
import { X, Pencil, Plus, LayoutGrid } from "lucide-react";

interface AreaDetailsPanelProps {
  nodo: NodoOrg | null;
  alCerrar: () => void;
}

const TarjetaMetrica = ({ etiqueta, valor, resaltado }: { etiqueta: string; valor: string | number; resaltado?: boolean }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-[9px] uppercase tracking-widest text-[#8aa3ad] font-semibold">{etiqueta}</span>
    <span className={`text-lg font-bold leading-none ${resaltado ? "text-emerald-400" : "text-white"}`}>
      {valor}
    </span>
  </div>
);

export default function AreaDetailsPanel({ nodo, alCerrar }: AreaDetailsPanelProps) {
  if (!nodo) return null;

  return (
    <aside
      className="fixed top-0 right-0 h-full w-[300px] z-30 bg-[#0F1819] border-l border-[#1E333A] flex flex-col overflow-y-auto"
      style={{ animation: "slideIn 0.2s ease-out" }}
    >
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>

      {/* Encabezado */}
      <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-[#1E333A]">
        <span className="text-sm font-semibold text-white">Detalles del Area</span>
        <button onClick={alCerrar} className="text-[#8aa3ad] hover:text-white transition-colors rounded-md p-1">
          <X size={16} />
        </button>
      </div>

      <div className="flex flex-col gap-5 px-5 py-5 flex-1">
        {/* Identidad */}
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#1E333A] flex items-center justify-center shrink-0">
            <LayoutGrid size={16} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm leading-tight">{nodo.nombre}</p>
            <p className="text-[#8aa3ad] text-[11px] mt-0.5">Operaciones Globales</p>
          </div>
        </div>

        {/* Descripcion */}
        <p className="text-[#8aa3ad] text-xs leading-relaxed">{nodo.descripcion}</p>

        {/* Metricas clave */}
        <div>
          <span className="text-[9px] uppercase tracking-widest text-[#8aa3ad] font-semibold block mb-3">
            Metricas Clave
          </span>
          <div className="grid grid-cols-2 gap-4 bg-[#1E333A] rounded-xl p-4">
            <TarjetaMetrica etiqueta="Empleados" valor={nodo.cantidadMiembros} />
            <TarjetaMetrica etiqueta="Vacantes" valor={nodo.vacantes} resaltado />
            <TarjetaMetrica etiqueta="Uso Presupuesto" valor={`${nodo.utilizacionPresupuesto}%`} />
            <TarjetaMetrica etiqueta="Retencion" valor={`${nodo.retencion}%`} resaltado={nodo.retencion >= 90} />
          </div>
        </div>

        {/* Lideres */}
        <div>
          <span className="text-[9px] uppercase tracking-widest text-[#8aa3ad] font-semibold block mb-3">
            Lideres del Departamento
          </span>
          <div className="flex flex-col gap-2">
            {nodo.lideres.map((lider) => (
              <div key={lider.id} className="flex items-center gap-3 bg-[#1E333A] rounded-xl px-3 py-2.5">
                <div className="w-8 h-8 rounded-full bg-[#203D47] flex items-center justify-center text-[11px] font-bold text-[#BDD5EA] shrink-0">
                  {lider.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-semibold truncate">{lider.nombre}</p>
                  <p className="text-[#8aa3ad] text-[10px] truncate">{lider.cargo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Botones */}
      <div className="px-5 pb-6 flex flex-col gap-2 border-t border-[#1E333A] pt-4">
        <button className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors">
          <Pencil size={13} />
          Editar Departamento
        </button>
        <button className="w-full flex items-center justify-center gap-2 bg-transparent border border-[#203D47] hover:border-[#BDD5EA] text-[#BDD5EA] text-xs font-semibold py-2.5 rounded-xl transition-colors">
          <Plus size={13} />
          Agregar Subarea
        </button>
        <button className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors">
          Administrar Areas
        </button>
      </div>
    </aside>
  );
}