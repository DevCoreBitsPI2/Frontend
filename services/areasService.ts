// Backend simulado — se reemplazzara por fetch real a Supabase cuando este disponible

export interface Area {
  id: string;
  nombre: string;
  descripcion: string;
  posiciones: number;
  estado: "ACTIVO" | "INACTIVO" | "EN_REVISION";
  color: string;
  icono: string;
}

const AREAS_MOCK: Area[] = [
  {
    id: "1",
    nombre: "Departamento de Ingenieria",
    descripcion: "Desarrollo de software, QA y DevOps...",
    posiciones: 42,
    estado: "ACTIVO",
    color: "#3B82F6",
    icono: "ingenieria",
  },
  {
    id: "2",
    nombre: "Cumplimiento Corporativo",
    descripcion: "Estandares regulatorios y politicas internas...",
    posiciones: 12,
    estado: "ACTIVO",
    color: "#8B5CF6",
    icono: "cumplimiento",
  },
  {
    id: "3",
    nombre: "Operaciones Financieras",
    descripcion: "Contabilidad, nomina y gestion presupuestaria...",
    posiciones: 28,
    estado: "ACTIVO",
    color: "#F59E0B",
    icono: "finanzas",
  },
  {
    id: "4",
    nombre: "Marketing y Comunicaciones",
    descripcion: "Estrategia de marca, PR y marketing digital...",
    posiciones: 18,
    estado: "ACTIVO",
    color: "#EC4899",
    icono: "marketing",
  },
  {
    id: "5",
    nombre: "Exito del Cliente",
    descripcion: "Soporte al cliente y gestion de cuentas...",
    posiciones: 35,
    estado: "ACTIVO",
    color: "#10B981",
    icono: "clientes",
  },
  {
    id: "6",
    nombre: "Recursos Humanos",
    descripcion: "Adquisicion de talento, cultura y beneficios...",
    posiciones: 15,
    estado: "ACTIVO",
    color: "#F97316",
    icono: "rrhh",
  },
];

export const obtenerAreas = async (): Promise<Area[]> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return AREAS_MOCK;
};

export const crearArea = async (datos: Omit<Area, "id">): Promise<Area> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const nueva: Area = { ...datos, id: Date.now().toString() };
  AREAS_MOCK.push(nueva);
  return nueva;
};

export const editarArea = async (id: string, datos: Partial<Area>): Promise<Area> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const index = AREAS_MOCK.findIndex((a) => a.id === id);
  if (index === -1) throw new Error("Area no encontrada");
  AREAS_MOCK[index] = { ...AREAS_MOCK[index], ...datos };
  return AREAS_MOCK[index];
};

export const eliminarArea = async (id: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const index = AREAS_MOCK.findIndex((a) => a.id === id);
  if (index !== -1) AREAS_MOCK.splice(index, 1);
};