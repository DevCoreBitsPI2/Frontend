// Backend simulado — reemplazar por fetch real a Supabase cuando este disponible

export interface Position {
  id: string;
  nombre: string;
  empleados: {
    id: string;
    nombre: string;
    foto?: string;
    iniciales: string;
  }[];
  posicionSuperior: string | null;
  estado: "Active" | "Drafting";
  areaId: string;
}

export interface PositionsResponse {
  data: Position[];
  total: number;
  page: number;
  pageSize: number;
}

const POSITIONS_MOCK: Position[] = [
  {
    id: "POS-00001",
    nombre: "Senior Architect",
    empleados: [
      { id: "emp1", nombre: "John Doe", iniciales: "JD" },
      { id: "emp2", nombre: "Jane Smith", iniciales: "JS" },
    ],
    posicionSuperior: "Chief Technology Officer",
    estado: "Active",
    areaId: "area-1",
  },
  {
    id: "POS-00002",
    nombre: "Cloud Infrastructure Lead",
    empleados: [
      { id: "emp3", nombre: "Carlos López", iniciales: "CL" },
    ],
    posicionSuperior: "Senior Architect",
    estado: "Active",
    areaId: "area-1",
  },
  {
    id: "POS-00003",
    nombre: "Security Analyst",
    empleados: [],
    posicionSuperior: null,
    estado: "Drafting",
    areaId: "area-2",
  },
  {
    id: "POS-00004",
    nombre: "Frontend Developer",
    empleados: [
      { id: "emp4", nombre: "María García", iniciales: "MG" },
      { id: "emp5", nombre: "Pedro Martínez", iniciales: "PM" },
    ],
    posicionSuperior: "Engineering Manager",
    estado: "Active",
    areaId: "area-1",
  },
  {
    id: "POS-00005",
    nombre: "Backend Engineer",
    empleados: [
      { id: "emp6", nombre: "Alex Turner", iniciales: "AT" },
    ],
    posicionSuperior: "Engineering Manager",
    estado: "Active",
    areaId: "area-1",
  },
  {
    id: "POS-00006",
    nombre: "Product Manager",
    empleados: [
      { id: "emp7", nombre: "Sofia Rodríguez", iniciales: "SR" },
    ],
    posicionSuperior: "Director of Product",
    estado: "Active",
    areaId: "area-3",
  },
  {
    id: "POS-00007",
    nombre: "DevOps Engineer",
    empleados: [],
    posicionSuperior: "Cloud Infrastructure Lead",
    estado: "Drafting",
    areaId: "area-1",
  },
  {
    id: "POS-00008",
    nombre: "QA Lead",
    empleados: [
      { id: "emp8", nombre: "Roberto Santos", iniciales: "RS" },
      { id: "emp9", nombre: "Laura Díaz", iniciales: "LD" },
    ],
    posicionSuperior: "Engineering Manager",
    estado: "Active",
    areaId: "area-1",
  },
  {
    id: "POS-00009",
    nombre: "UX Designer",
    empleados: [
      { id: "emp10", nombre: "Emma Wilson", iniciales: "EW" },
    ],
    posicionSuperior: "Design Lead",
    estado: "Active",
    areaId: "area-4",
  },
  {
    id: "POS-00010",
    nombre: "Data Analyst",
    empleados: [],
    posicionSuperior: "Data Manager",
    estado: "Drafting",
    areaId: "area-5",
  },
];

export interface GetPositionsFilter {
  searchText?: string;
  status?: "Active" | "Drafting" | "all";
  tab?: "All" | "Hierarchy" | "Archived";
  page?: number;
  pageSize?: number;
}

export const obtenerPosiciones = async (
  filters?: GetPositionsFilter
): Promise<PositionsResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const {
    searchText = "",
    status = "all",
    page = 1,
    pageSize = 10,
  } = filters || {};

  let filtered = POSITIONS_MOCK;

  // Filtrar por búsqueda
  if (searchText) {
    filtered = filtered.filter(
      (pos) =>
        pos.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
        pos.id.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  // Filtrar por estado
  if (status !== "all") {
    filtered = filtered.filter((pos) => pos.estado === status);
  }

  // Paginación
  const total = filtered.length;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const data = filtered.slice(startIndex, endIndex);

  return {
    data,
    total,
    page,
    pageSize,
  };
};

export const crearPosicion = async (
  datos: Omit<Position, "id">
): Promise<Position> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const newId = `POS-${String(POSITIONS_MOCK.length + 1).padStart(5, "0")}`;
  const nuevaPosicion: Position = { ...datos, id: newId };
  POSITIONS_MOCK.push(nuevaPosicion);
  return nuevaPosicion;
};

export const editarPosicion = async (
  id: string,
  datos: Partial<Position>
): Promise<Position> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const index = POSITIONS_MOCK.findIndex((pos) => pos.id === id);
  if (index === -1) throw new Error("Posición no encontrada");
  POSITIONS_MOCK[index] = { ...POSITIONS_MOCK[index], ...datos };
  return POSITIONS_MOCK[index];
};

export const eliminarPosicion = async (id: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const index = POSITIONS_MOCK.findIndex((pos) => pos.id === id);
  if (index !== -1) POSITIONS_MOCK.splice(index, 1);
};
