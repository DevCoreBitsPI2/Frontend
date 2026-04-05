"use client";

// components/areas/NewAreaModal.tsx

import React, { useState } from "react";
import { X } from "lucide-react";
import { crearArea } from "@/services/areasService";

interface NewAreaModalProps {
  onCerrar: () => void;
  onCreada: () => void;
}

const COLORES_DISPONIBLES = [
  "#3B82F6", "#8B5CF6", "#F59E0B",
  "#EC4899", "#10B981", "#F97316",
  "#06B6D4", "#EF4444", "#84CC16",
];

export default function NewAreaModal({ onCerrar, onCreada }: NewAreaModalProps) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [posiciones, setPosiciones] = useState("");
  const [colorSeleccionado, setColorSeleccionado] = useState(COLORES_DISPONIBLES[0]);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  const manejarGuardar = async () => {
    if (!nombre.trim()) { setError("El nombre del area es obligatorio."); return; }
    if (!descripcion.trim()) { setError("La descripcion es obligatoria."); return; }
    if (!posiciones || isNaN(Number(posiciones))) { setError("Ingresa un numero de posiciones valido."); return; }

    setGuardando(true);
    setError("");
    try {
      await crearArea({
        nombre: nombre.trim(),
        descripcion: descripcion.trim(),
        posiciones: Number(posiciones),
        estado: "ACTIVO",
        color: colorSeleccionado,
        icono: "default",
      });
      onCreada();
    } catch {
      setError("Ocurrio un error al crear el area. Intentalo de nuevo.");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden">
        {/* Encabezado */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#f0f4f5]">
          <div>
            <h2 className="text-base font-semibold text-[#0F1819]">Nueva Area</h2>
            <p className="text-xs text-[#8aa3ad] mt-0.5">Completa los datos para crear un area organizacional</p>
          </div>
          <button
            onClick={onCerrar}
            className="p-1.5 text-[#8aa3ad] hover:text-[#0F1819] hover:bg-[#ECEFF1] rounded-lg transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Formulario */}
        <div className="px-6 py-5 flex flex-col gap-4">
          {/* Nombre */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#203D47] uppercase tracking-wider">
              Nombre del Area
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Departamento de Ingenieria"
              className="w-full px-3.5 py-2.5 text-sm border border-[#d1dde2] rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 text-[#0F1819] placeholder:text-[#c5d5db]"
            />
          </div>

          {/* Descripcion */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#203D47] uppercase tracking-wider">
              Descripcion
            </label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Describe brevemente las funciones del area..."
              rows={3}
              className="w-full px-3.5 py-2.5 text-sm border border-[#d1dde2] rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 text-[#0F1819] placeholder:text-[#c5d5db] resize-none"
            />
          </div>

          {/* Posiciones */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#203D47] uppercase tracking-wider">
              Numero de Posiciones
            </label>
            <input
              type="number"
              value={posiciones}
              onChange={(e) => setPosiciones(e.target.value)}
              placeholder="Ej: 20"
              min={1}
              className="w-full px-3.5 py-2.5 text-sm border border-[#d1dde2] rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 text-[#0F1819] placeholder:text-[#c5d5db]"
            />
          </div>

          {/* Color */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#203D47] uppercase tracking-wider">
              Color identificador
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {COLORES_DISPONIBLES.map((color) => (
                <button
                  key={color}
                  onClick={() => setColorSeleccionado(color)}
                  className={`w-7 h-7 rounded-full transition-all ${
                    colorSeleccionado === color
                      ? "ring-2 ring-offset-2 ring-[#203D47] scale-110"
                      : "hover:scale-105"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-xs text-rose-500 bg-rose-50 px-3 py-2 rounded-lg">{error}</p>
          )}
        </div>

        {/* Botones */}
        <div className="flex items-center justify-end gap-2 px-6 pb-5">
          <button
            onClick={onCerrar}
            className="px-4 py-2 text-sm text-[#8aa3ad] hover:text-[#0F1819] border border-[#d1dde2] hover:border-[#8aa3ad] rounded-xl transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={manejarGuardar}
            disabled={guardando}
            className="px-4 py-2 text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-400 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {guardando ? "Guardando..." : "Crear Area"}
          </button>
        </div>
      </div>
    </div>
  );
}