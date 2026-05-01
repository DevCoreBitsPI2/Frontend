"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GitFork,
  Users,
  UserRound,
  FolderKanban,
  FileText,
  LogOut,
} from "lucide-react";

const ITEMS_NAV = [
  { etiqueta: "Panel Principal",         href: "/dashboard",           icono: LayoutDashboard },
  { etiqueta: "Perfil de Usuario",      href: "/dashboard/perfil",    icono: UserRound       },
  { etiqueta: "Organigrama",             href: "/dashboard/org-chart", icono: GitFork         },
  // { etiqueta: "Directorio de Empleados", href: "/dashboard/empleados", icono: Users           },
  { etiqueta: "Gestion de Areas",        href: "/dashboard/areas",     icono: FolderKanban    },
  // { etiqueta: "Contratos",               href: "/dashboard/contratos", icono: FileText        },
];

export default function Sidebar() {
  const rutaActual = usePathname();

  const estaActivo = (href: string) =>
    href === "/dashboard"
      ? rutaActual === "/dashboard"
      : rutaActual.startsWith(href);

  return (
    <aside className="flex flex-col w-[220px] min-h-screen bg-[#0F1819] shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-[#1E333A]">
        <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shrink-0">
          {/* Espacio reservado para logo — reemplazar con <Image> cuando este disponible */}
          <span className="text-white font-bold text-sm">T</span>
        </div>
        <span className="text-white font-bold text-base tracking-tight">TalentCore</span>
      </div>

      {/* Navegacion principal */}
      <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
        {ITEMS_NAV.map(({ etiqueta, href, icono: Icono }) => {
          const activo = estaActivo(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 ${
                activo
                  ? "bg-[#1E333A] text-white font-semibold"
                  : "text-[#8aa3ad] hover:bg-[#1E333A] hover:text-white"
              }`}
            >
              <Icono size={16} className={activo ? "text-emerald-400" : "text-[#8aa3ad]"} />
              {etiqueta}
            </Link>
          );
        })}
      </nav>

      {/* Parte inferior */}
      <div className="flex flex-col gap-1 px-3 pb-5 border-t border-[#1E333A] pt-3">
        {/* <Link
          href="/dashboard/configuracion"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#8aa3ad] hover:bg-[#1E333A] hover:text-white transition-all duration-150"
        >
          <Settings size={16} />
          Configuracion
        </Link> */}
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#8aa3ad] hover:bg-[#1E333A] hover:text-rose-400 transition-all duration-150 w-full text-left">
          <LogOut size={16} />
          Cerrar Sesion
        </button>
      </div>
    </aside>
  );
}