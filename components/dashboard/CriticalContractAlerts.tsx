// components/dashboard/CriticalContractAlerts.tsx
"use client";

import { AlertTriangle } from "lucide-react";
import { AlertaContrato } from "@/services/dashboardService";

interface Props {
  alertas: AlertaContrato[];
}

function colorPorDias(dias: number): string {
  if (dias <= 7) return "text-rose-500";
  if (dias <= 14) return "text-orange-500";
  return "text-blue-500";
}

export default function CriticalContractAlerts({ alertas }: Props) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-[#e4ebee] flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AlertTriangle size={16} className="text-amber-500" />
          <h2 className="text-sm font-bold text-[#0F1819]">Alertas Críticas de Contratos</h2>
        </div>
        <span className="text-xs text-[#8aa3ad] font-medium">Próximos 30 días</span>
      </div>

      <div className="flex flex-col gap-3 flex-1">
        {alertas.map((alerta) => {
          const color = colorPorDias(alerta.diasRestantes);
          return (
            <div
              key={alerta.idContrato} 
              className="flex items-center justify-between py-2 border-b border-[#f0f4f5] last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#ECEFF1] flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-[#203D47]">
                    {alerta.nombre.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0F1819] leading-none">
                    {alerta.nombre}
                  </p>
                  <p className="text-xs text-[#8aa3ad] mt-0.5">
                    ID: {alerta.codigoContrato} • {alerta.departamento}
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0 ml-4">
                <p className={`text-xs font-bold ${color}`}>
                  Exp. en {alerta.diasRestantes} días
                </p>
                <p className="text-xs text-[#8aa3ad]">{alerta.fechaFin}</p>
              </div>
            </div>
          );
        })}
      </div>

      <button className="mt-4 text-xs text-[#8aa3ad] hover:text-[#203D47] transition-colors font-medium text-center w-full pt-3 border-t border-[#f0f4f5]">
        Ver todos los hitos contractuales
      </button>
    </div>
  );
}