"use client";

import {
  ShieldCheck,
  CalendarClock,
  CalendarX2,
  CircleSlash,
  MoreVertical,
} from "lucide-react";
import { Contrato, EstadoContrato, TipoContrato, ValidezContrato } from "@/services/contratosService";

interface ContratosTableProps {
  contratos: Contrato[];
}

function obtenerIconoTipo(tipo: TipoContrato) {
  switch (tipo) {
    case "INDEFINIDO":
      return { icon: ShieldCheck, color: "text-emerald-500" };
    case "FIJO":
      return { icon: CalendarClock, color: "text-pale-sky-500" };
    case "SERVICIO":
      return { icon: CircleSlash, color: "text-platinum-400" };
    case "TIEMPO_PARCIAL":
      return { icon: CalendarX2, color: "text-amber-500" };
  }
}

function etiquetaTipo(tipo: TipoContrato): string {
  switch (tipo) {
    case "INDEFINIDO": return "Indefinite Term";
    case "FIJO": return "Fixed Term";
    case "SERVICIO": return "Service Contract";
    case "TIEMPO_PARCIAL": return "Part-time";
  }
}

function badgeEstado(estado: EstadoContrato) {
  switch (estado) {
    case "ACTIVO":
      return { label: "Active", clase: "bg-emerald-50 text-emerald-600" };
    case "RENOVADO":
      return { label: "Renewed", clase: "bg-pale-sky-50 text-pale-sky-600" };
    case "EXPIRADO":
      return { label: "Expired", clase: "bg-rose-50 text-rose-500" };
    case "ANULADO":
      return { label: "Voided", clase: "bg-platinum-50 text-platinum-500" };
  }
}

function barraValidez(validez: ValidezContrato) {
  switch (validez) {
    case "ONGOING":
      return { label: "ONGOING", color: "bg-emerald-500" };
    case "COMPLETED":
      return { label: "COMPLETED", color: "bg-pale-sky-500" };
    case "EXPIRED":
      return { label: "EXPIRED", color: "bg-rose-500" };
    case "VOIDED":
      return { label: "VOIDED", color: "bg-platinum-300" };
  }
}

function formatFecha(fecha: string | null): string {
  if (!fecha) return "No expiration";
  const d = new Date(fecha);
  if (Number.isNaN(d.getTime())) return fecha;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export default function ContratosTable({ contratos }: ContratosTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#e8eef0] overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#f0f4f5]">
            <th className="px-5 py-3 text-left text-[10px] font-bold text-[#8aa3ad] uppercase tracking-widest">
              Contract Type
            </th>
            <th className="px-5 py-3 text-left text-[10px] font-bold text-[#8aa3ad] uppercase tracking-widest">
              Start Date
            </th>
            <th className="px-5 py-3 text-left text-[10px] font-bold text-[#8aa3ad] uppercase tracking-widest">
              End Date
            </th>
            <th className="px-5 py-3 text-left text-[10px] font-bold text-[#8aa3ad] uppercase tracking-widest">
              Status
            </th>
            <th className="px-5 py-3 text-left text-[10px] font-bold text-[#8aa3ad] uppercase tracking-widest">
              Validity
            </th>
            <th className="px-5 py-3 text-left text-[10px] font-bold text-[#8aa3ad] uppercase tracking-widest">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {contratos.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-5 py-10 text-center text-sm text-[#8aa3ad]">
                No contracts registered for this employee yet.
              </td>
            </tr>
          ) : (
            contratos.map((c) => {
              const { icon: Icono, color } = obtenerIconoTipo(c.tipo);
              const estado = badgeEstado(c.estado);
              const validez = barraValidez(c.validez);
              const atenuado = c.estado === "ANULADO";

              return (
                <tr
                  key={c.id}
                  className={`border-b border-[#f0f4f5] last:border-b-0 hover:bg-[#f8fafb] transition-colors ${
                    atenuado ? "opacity-60" : ""
                  }`}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <Icono size={16} className={color} />
                      <span className="text-sm font-semibold text-[#0F1819]">
                        {etiquetaTipo(c.tipo)}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-[#0F1819]">
                    {formatFecha(c.fechaInicio)}
                  </td>
                  <td className="px-5 py-4 text-sm text-[#8aa3ad]">
                    {formatFecha(c.fechaFin)}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${estado.clase}`}
                    >
                      {estado.label}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-[#8aa3ad] tracking-wider">
                        {validez.label}
                      </span>
                      <div className="w-20 h-1 rounded-full overflow-hidden bg-[#e8eef0]">
                        <div className={`h-full ${validez.color}`} />
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      type="button"
                      className="p-1.5 text-[#8aa3ad] hover:text-[#0F1819] hover:bg-[#f4f7f8] rounded-lg transition-colors"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
