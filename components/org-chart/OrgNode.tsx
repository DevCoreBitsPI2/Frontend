"use client";

// components/org-chart/OrgNode.tsx

import React from "react";
import { NodoOrg } from "@/services/orgChartService";

interface OrgNodeProps {
  nodo: NodoOrg & { hijos?: any[] };
  estaSeleccionado: boolean;
  alHacerClic: (nodo: NodoOrg) => void;
  esRaiz?: boolean;
}

const CONFIG_ESTADO: Record<string, { etiqueta: string; colorPunto: string; colorBorde: string; colorTexto: string }> = {
  ACTIVO:              { etiqueta: "ACTIVO",              colorPunto: "bg-emerald-400", colorBorde: "border-emerald-400", colorTexto: "text-emerald-400" },
  ESTABLE:             { etiqueta: "ESTABLE",             colorPunto: "bg-sky-400",     colorBorde: "border-sky-400",     colorTexto: "text-sky-400"     },
  ALTA_ROTACION:       { etiqueta: "ALTA ROTACION",       colorPunto: "bg-rose-400",    colorBorde: "border-rose-400",    colorTexto: "text-rose-400"    },
  NECESIDADES_CRITICAS:{ etiqueta: "NECESIDADES CRITICAS",colorPunto: "bg-amber-400",   colorBorde: "border-amber-400",   colorTexto: "text-amber-400"   },
  INACTIVO:            { etiqueta: "INACTIVO",            colorPunto: "bg-slate-400",   colorBorde: "border-slate-400",   colorTexto: "text-slate-400"   },
};

const COLORES_NIVEL: Record<string, string> = {
  EJECUTIVO:      "text-emerald-400",
  TECNICO:        "text-sky-400",
  INFRAESTRUCTURA:"text-violet-400",
  SEGURIDAD:      "text-rose-400",
  GESTION:        "text-amber-400",
  OPERACIONES:    "text-teal-400",
};

export default function OrgNode({ nodo, estaSeleccionado, alHacerClic, esRaiz = false }: OrgNodeProps) {
  const estado = CONFIG_ESTADO[nodo.estado] ?? CONFIG_ESTADO.ESTABLE;
  const colorNivel = COLORES_NIVEL[nodo.nivel] ?? "text-slate-400";

  if (esRaiz) {
    return (
      <button
        onClick={() => alHacerClic(nodo)}
        className={`relative flex flex-col items-center justify-center rounded-xl px-8 py-4 min-w-[220px] cursor-pointer transition-all duration-200 select-none ${
          estaSeleccionado
            ? "bg-[#1E333A] ring-2 ring-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.25)]"
            : "bg-[#0F1819] hover:bg-[#1E333A] ring-1 ring-[#203D47]"
        }`}
      >
        <span className={`text-[10px] font-bold tracking-[0.2em] mb-1 ${colorNivel}`}>
          {nodo.nivel}
        </span>
        <span className="text-white font-semibold text-base leading-tight text-center">
          {nodo.nombre}
        </span>
        <div className="flex items-center gap-1.5 mt-2">
          <span className="text-[#BDD5EA] text-xs">{nodo.cantidadMiembros} Miembros</span>
          <span className={`w-1.5 h-1.5 rounded-full ${estado.colorPunto}`} />
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={() => alHacerClic(nodo)}
      className={`relative flex flex-col rounded-xl p-3.5 min-w-[170px] max-w-[190px] w-full cursor-pointer transition-all duration-200 select-none text-left ${
        estaSeleccionado
          ? `bg-[#1E333A] ring-2 ${estado.colorBorde} shadow-lg`
          : "bg-white hover:bg-[#f4f7f8] ring-1 ring-[#d1dde2]"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className={`text-[9px] font-bold tracking-widest uppercase ${estaSeleccionado ? colorNivel : "text-slate-400"}`}>
          {nodo.nivel}
        </span>
        <span className={`text-[9px] font-semibold tracking-wider ${estado.colorTexto}`}>
          {estado.etiqueta}
        </span>
      </div>

      <span className={`text-sm font-semibold leading-snug mb-2 ${estaSeleccionado ? "text-white" : "text-[#0F1819]"}`}>
        {nodo.nombre}
      </span>

      <div className="flex items-center gap-1.5">
        <div className="flex -space-x-1.5">
          {nodo.avatares.slice(0, 3).map((av, i) => (
            <div key={i} className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold border border-white bg-[#203D47] text-[#BDD5EA]">
              {av}
            </div>
          ))}
        </div>
        <span className={`text-[10px] ${estaSeleccionado ? "text-[#BDD5EA]" : "text-slate-400"}`}>
          {nodo.cantidadMiembros > 3 ? `+${nodo.cantidadMiembros - 3}` : `${nodo.cantidadMiembros}`}
        </span>
      </div>

      {nodo.estado === "ALTA_ROTACION" && (
        <span className="mt-2 text-[9px] text-rose-400 font-semibold">
          {nodo.vacantes} Alta Rotacion
        </span>
      )}
      {nodo.estado === "NECESIDADES_CRITICAS" && (
        <span className="mt-2 text-[9px] text-amber-400 font-semibold">Necesidades Criticas</span>
      )}
      {nodo.estado === "ACTIVO" && nodo.vacantes > 0 && (
        <span className="mt-2 text-[9px] text-slate-400">{nodo.vacantes} Puestos Abiertos</span>
      )}
    </button>
  );
}