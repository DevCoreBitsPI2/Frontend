// components/dashboard/StatsCard.tsx
"use client";

import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icono: LucideIcon;
  etiqueta: string;
  valor: number | string;
  variacion?: number;
  etiquetaVariacion?: string;
  colorIcono?: string;
}

export default function StatsCard({
  icono: Icono,
  etiqueta,
  valor,
  variacion,
  etiquetaVariacion,
  colorIcono = "text-emerald-500",
}: StatsCardProps) {
  const esPositivo = variacion !== undefined && variacion >= 0;
  const colorVariacion = esPositivo ? "text-emerald-500" : "text-rose-500";

  return (
    <div className="bg-white rounded-2xl p-5 flex-1 min-w-0 border border-[#e4ebee]">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2 rounded-xl bg-[#ECEFF1] ${colorIcono}`}>
          <Icono size={18} />
        </div>
        {variacion !== undefined && (
          <span className={`text-xs font-semibold ${colorVariacion}`}>
            {esPositivo ? "+" : ""}
            {variacion}%
          </span>
        )}
        {etiquetaVariacion && !variacion && (
          <span className="text-xs font-medium text-[#8aa3ad]">{etiquetaVariacion}</span>
        )}
      </div>
      <p className="text-sm text-[#8aa3ad] mb-1">{etiqueta}</p>
      <p className="text-3xl font-bold text-[#0F1819]">{valor.toLocaleString()}</p>
    </div>
  );
}