"use client";

import { useState } from "react";
import { Position } from "@/services/positionsService";

interface PositionRowProps {
  position: Position;
  onEdit?: (position: Position) => void;
  onDelete?: (position: Position) => void;
}

export default function PositionRow({
  position,
  onEdit,
  onDelete,
}: PositionRowProps) {
  const [showMenu, setShowMenu] = useState(false);

  const statusColor =
    position.estado === "Active"
      ? "bg-[#2ECC71] text-white"
      : "bg-[#FCD34D] text-[#0F1819]";

  return (
    <tr className="border-b border-[#BDD5EA] hover:bg-[#F9F9F9] transition-colors">
      <td className="px-6 py-4">
        <div>
          <p className="text-[#0F1819] font-semibold text-sm">{position.nombre}</p>
          <p className="text-[#8aa3ad] text-xs mt-1">{position.id}</p>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex gap-2 items-center">
          {position.empleados.slice(0, 3).map((emp) => (
            <div
              key={emp.id}
              className="w-8 h-8 rounded-full bg-[#203D47] flex items-center justify-center text-xs font-semibold text-[#ECEFF1] hover:bg-[#0F1819] transition-colors"
              title={emp.nombre}
            >
              {emp.iniciales}
            </div>
          ))}
          {position.empleados.length > 3 && (
            <span className="text-[#8aa3ad] text-xs font-semibold">+{position.empleados.length - 3}</span>
          )}
          {position.empleados.length === 0 && (
            <span className="text-[#8aa3ad] text-xs">None</span>
          )}
        </div>
      </td>
      <td className="px-6 py-4 text-[#203D47] text-sm">
        <span className="hover:text-[#0F1819] transition-colors">{position.posicionSuperior || "—"}</span>
      </td>
      <td className="px-6 py-4">
        <span className={`px-2.5 py-1 rounded text-xs font-semibold ${statusColor}`}>
          {position.estado}
        </span>
      </td>
      <td className="px-6 py-4 relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="text-[#8aa3ad] hover:text-[#203D47] p-1 hover:bg-[#ECEFF1] rounded transition-colors"
        >
          ⋮
        </button>
        {showMenu && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-[#BDD5EA] rounded shadow-md z-50 py-1">
            <button
              onClick={() => {
                onEdit?.(position);
                setShowMenu(false);
              }}
              className="block w-full text-left px-4 py-2 text-[#203D47] hover:bg-[#ECEFF1] text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => {
                onDelete?.(position);
                setShowMenu(false);
              }}
              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-[#ECEFF1] text-sm"
            >
              Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}
