// Tipos centralizados para el módulo de organigrama

export interface NodoOrg {
  id: string;
  nombre: string;
  nivel: "EJECUTIVO" | "TECNICO" | "INFRAESTRUCTURA" | "SEGURIDAD" | "GESTION" | "OPERACIONES";
  estado: "ACTIVO" | "ESTABLE" | "ALTA_ROTACION" | "NECESIDADES_CRITICAS" | "INACTIVO";
  cantidadMiembros: number;
  idPadre: string | null;
  descripcion: string;
  avatares: string[];
  vacantes: number;
  utilizacionPresupuesto: number;
  retencion: number;
  lideres: LiderDepartamento[];
}

export interface LiderDepartamento {
  id: string;
  nombre: string;
  cargo: string;
  avatar: string;
}

export interface NodoArbol extends NodoOrg {
  hijos: NodoArbol[];
}

export const CONFIG_ESTADO: Record<
  string,
  { etiqueta: string; colorPunto: string; colorBorde: string; colorTexto: string }
> = {
  ACTIVO:               { etiqueta: "ACTIVO",               colorPunto: "bg-emerald-400", colorBorde: "border-emerald-400", colorTexto: "text-emerald-400" },
  ESTABLE:              { etiqueta: "ESTABLE",              colorPunto: "bg-sky-400",     colorBorde: "border-sky-400",     colorTexto: "text-sky-400"     },
  ALTA_ROTACION:        { etiqueta: "ALTA ROTACION",        colorPunto: "bg-rose-400",    colorBorde: "border-rose-400",    colorTexto: "text-rose-400"    },
  NECESIDADES_CRITICAS: { etiqueta: "NECESIDADES CRITICAS", colorPunto: "bg-amber-400",   colorBorde: "border-amber-400",   colorTexto: "text-amber-400"   },
  INACTIVO:             { etiqueta: "INACTIVO",             colorPunto: "bg-slate-400",   colorBorde: "border-slate-400",   colorTexto: "text-slate-400"   },
};

export const COLORES_NIVEL: Record<string, string> = {
  EJECUTIVO:       "text-emerald-400",
  TECNICO:         "text-sky-400",
  INFRAESTRUCTURA: "text-violet-400",
  SEGURIDAD:       "text-rose-400",
  GESTION:         "text-amber-400",
  OPERACIONES:     "text-teal-400",
};