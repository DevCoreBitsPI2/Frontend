"use client";

import { useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";

interface ContractToastProps {
  mensaje: string;
  onCerrar: () => void;
  duracionMs?: number;
}

export default function ContractToast({
  mensaje,
  onCerrar,
  duracionMs = 3500,
}: ContractToastProps) {
  useEffect(() => {
    const timer = setTimeout(onCerrar, duracionMs);
    return () => clearTimeout(timer);
  }, [onCerrar, duracionMs]);

  return (
    <div
      className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-white rounded-xl shadow-lg border border-[#e8eef0] pl-3.5 pr-2.5 py-3 min-w-[260px]"
      style={{ animation: "fadeDown 0.25s ease-out" }}
    >
      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
        <CheckCircle2 size={16} className="text-emerald-500" />
      </div>
      <span className="text-sm font-semibold text-[#0F1819] flex-1">{mensaje}</span>
      <button
        onClick={onCerrar}
        className="p-1 text-[#8aa3ad] hover:text-[#0F1819] rounded-md transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  );
}
