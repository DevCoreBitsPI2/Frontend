"use client";

import React, { useEffect } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

interface ToastProps {
  mensaje: string;
  tipo: "exito" | "error";
  onCerrar: () => void;
}

export default function Toast({ mensaje, tipo, onCerrar }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onCerrar, 3500);
    return () => clearTimeout(timer);
  }, [onCerrar]);

  return (
    <div
      className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-white text-sm font-medium
        ${tipo === "exito" ? "bg-emerald-500" : "bg-rose-500"}`}
      style={{ animation: "fadeDown 0.25s ease-out" }}
    >
      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      {tipo === "exito"
        ? <CheckCircle size={16} className="shrink-0" />
        : <XCircle size={16} className="shrink-0" />
      }
      <span>{mensaje}</span>
      <button onClick={onCerrar} className="ml-2 hover:opacity-75 transition-opacity">
        <X size={14} />
      </button>
    </div>
  );
}