"use client";

interface LoadingSpinnerProps {
  mensaje?: string;
}

export default function LoadingSpinner({ mensaje = "Cargando..." }: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-[#203D47] border-t-emerald-400 animate-spin" />
        <span className="text-xs text-[#8aa3ad]">{mensaje}</span>
      </div>
    </div>
  );
}