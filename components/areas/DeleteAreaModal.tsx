"use client";

import React, { useState } from "react";
import { AlertTriangle, AlertCircle } from "lucide-react";
import { Area, eliminarArea } from "@/services/areasService";

interface DeleteAreaModalProps {
  area: Area;
  onCerrar: () => void;
  onEliminada: () => void;
}

export default function DeleteAreaModal({ area, onCerrar, onEliminada }: DeleteAreaModalProps) {
  const [eliminando, setEliminando] = useState(false);
  const tieneposiciones = area.posiciones > 0;

  const manejarEliminar = async () => {
    setEliminando(true);
    try {
      await eliminarArea(area.id);
      onEliminada();
    } finally {
      setEliminando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6 flex flex-col gap-4">
        {/* Icono y titulo */}
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
            <AlertTriangle size={18} className="text-amber-500" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-[#0F1819]">Eliminar esta area?</h2>
            <p className="text-sm text-[#8aa3ad] mt-1 leading-relaxed">
              Esta seguro que quiere eliminar el{" "}
              <span className="font-semibold text-[#0F1819]">{area.nombre}</span>?
              Esta accion no se puede deshacer.
            </p>
          </div>
        </div>

        {/* Advertencia de posiciones enlazadas */}
        {tieneposiciones && (
          <div className="flex items-start gap-2.5 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">
            <AlertCircle size={15} className="text-rose-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-rose-600">
                Esta area tiene {area.posiciones} posiciones enlazadas.
              </p>
              <p className="text-xs text-rose-400 mt-0.5">
                Todas las posiciones enlazadas deben ser reasignadas o cerradas antes de eliminar esta area.
              </p>
            </div>
          </div>
        )}

        {/* Botones */}
        <div className="flex items-center justify-end gap-3 pt-1">
          <button
            onClick={onCerrar}
            className="px-4 py-2 text-sm text-[#8aa3ad] hover:text-[#0F1819] border border-[#d1dde2] rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={manejarEliminar}
            disabled={eliminando}
            className="px-4 py-2 text-sm font-semibold text-white bg-rose-500 hover:bg-rose-400 rounded-lg transition-colors disabled:opacity-60"
          >
            {eliminando ? "Eliminando..." : "Eliminar Area"}
          </button>
        </div>
      </div>
    </div>
  );
}