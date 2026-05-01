// components/dashboard/DepartmentalHierarchy.tsx
"use client";

import { GitFork } from "lucide-react";
import { NodoOrg } from "@/types/orgChart";

interface Props {
  departamentos: NodoOrg[];
}

const COLORES_NIVEL: Record<string, string> = {
  EJECUTIVO:       "bg-[#203D47] text-white",
  TECNICO:         "bg-[#BDD5EA] text-[#203D47]",
  INFRAESTRUCTURA: "bg-[#BDD5EA] text-[#203D47]",
  SEGURIDAD:       "bg-[#ECEFF1] text-[#203D47]",
  GESTION:         "bg-[#ECEFF1] text-[#203D47]",
  OPERACIONES:     "bg-[#ECEFF1] text-[#203D47]",
};

const ANCHOS_BARRA = {
  0: "w-0",
  10: "w-[10%]",
  20: "w-[20%]",
  30: "w-[30%]",
  40: "w-[40%]",
  50: "w-[50%]",
  60: "w-[60%]",
  70: "w-[70%]",
  80: "w-[80%]",
  90: "w-[90%]",
  100: "w-full",
} as const;

function obtenerClaseAnchoBarra(porcentaje: number) {
  const redondeado = Math.max(0, Math.min(100, Math.round(porcentaje / 10) * 10));
  return ANCHOS_BARRA[redondeado as keyof typeof ANCHOS_BARRA] ?? "w-full";
}

export default function DepartmentalHierarchy({ departamentos }: Props) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-[#e4ebee] flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <GitFork size={16} className="text-[#203D47]" />
        <h2 className="text-sm font-bold text-[#0F1819]">Jerarquía Departamental</h2>
      </div>

      <div className="flex flex-col gap-4 flex-1">
        {departamentos.map((dep) => {
          const badgeClase = COLORES_NIVEL[dep.nivel] ?? "bg-[#ECEFF1] text-[#203D47]";

          return (
            <div key={dep.id} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-semibold tracking-wide text-[#8aa3ad] capitalize">
                    {dep.nivel}
                  </span>
                  <p className="text-sm font-bold text-[#0F1819] leading-tight">{dep.nombre}</p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg shrink-0 ${badgeClase}`}>
                  {dep.cantidadMiembros} Empleados
                </span>
              </div>
              {/* Barra de progreso — usa utilizacionPresupuesto que ya es 0-100 */}
              <div className="h-1.5 bg-[#ECEFF1] rounded-full overflow-hidden">
                <div
                  className={`h-full bg-emerald-500 rounded-full transition-all duration-700 ${obtenerClaseAnchoBarra(dep.utilizacionPresupuesto)}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}