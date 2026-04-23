// Backend simulado — se adaptará al backend real de Supabase cuando esté disponible

import { NodoOrg, NodoArbol } from "@/types/orgChart";

 const DATOS_MOCK: NodoOrg[] = [
  {
    id: "1",
    nombre: "Junta de Operaciones",
    nivel: "EJECUTIVO",
    estado: "ACTIVO",
    cantidadMiembros: 12,
    idPadre: null,
    descripcion:
      "Supervisa la estrategia global, la gobernanza corporativa y la toma de decisiones de alto nivel en todas las unidades de negocio.",
    avatares: ["SJ", "MT", "AL", "RK"],
    vacantes: 2,
    utilizacionPresupuesto: 91,
    retencion: 97,
    lideres: [
      {
        id: "l1",
        nombre: "Sara Jimenez",
        cargo: "Directora Ejecutiva",
        avatar: "SJ",
      },
      {
        id: "l2",
        nombre: "Marcos Torres",
        cargo: "Director de Operaciones",
        avatar: "MT",
      },
    ],
  },
  {
    id: "2",
    nombre: "Depto. de Ingenieria",
    nivel: "TECNICO",
    estado: "ACTIVO",
    cantidadMiembros: 45,
    idPadre: "1",
    descripcion:
      "Responsable de toda la arquitectura tecnica, infraestructura en la nube y protocolos de seguridad en los productos empresariales.",
    avatares: ["SJ", "MT", "AL"],
    vacantes: 8,
    utilizacionPresupuesto: 82,
    retencion: 94,
    lideres: [
      {
        id: "l3",
        nombre: "Sara Jimenez",
        cargo: "Jefa de Ingenieria",
        avatar: "SJ",
      },
      {
        id: "l4",
        nombre: "Marcos Torres",
        cargo: "VP de Estrategia Tecnica",
        avatar: "MT",
      },
    ],
  },
  {
    id: "3",
    nombre: "Cumplimiento Corporativo",
    nivel: "GESTION",
    estado: "ESTABLE",
    cantidadMiembros: 8,
    idPadre: "1",
    descripcion:
      "Garantiza el cumplimiento normativo, la gestion de riesgos y las funciones de auditoria interna en todos los departamentos.",
    avatares: ["AL", "RK"],
    vacantes: 1,
    utilizacionPresupuesto: 74,
    retencion: 98,
    lideres: [
      {
        id: "l5",
        nombre: "Andrea Lopez",
        cargo: "Directora de Cumplimiento",
        avatar: "AL",
      },
    ],
  },
  {
    id: "4",
    nombre: "Arquitecto Senior",
    nivel: "TECNICO",
    estado: "ACTIVO",
    cantidadMiembros: 6,
    idPadre: "2",
    descripcion:
      "Lidera el diseno de sistemas, decisiones arquitectonicas y estandares tecnicos para el desarrollo de software empresarial.",
    avatares: ["JD", "PK"],
    vacantes: 4,
    utilizacionPresupuesto: 88,
    retencion: 90,
    lideres: [
      {
        id: "l6",
        nombre: "Juan Donado",
        cargo: "Arquitecto Principal",
        avatar: "JD",
      },
    ],
  },
  {
    id: "5",
    nombre: "Infra. en la Nube",
    nivel: "INFRAESTRUCTURA",
    estado: "NECESIDADES_CRITICAS",
    cantidadMiembros: 11,
    idPadre: "2",
    descripcion:
      "Administra plataformas en la nube, pipelines de DevOps y confiabilidad de infraestructura a escala.",
    avatares: ["PK", "NR"],
    vacantes: 6,
    utilizacionPresupuesto: 95,
    retencion: 81,
    lideres: [
      {
        id: "l7",
        nombre: "Patricia Kaps",
        cargo: "Lider de Nube",
        avatar: "PK",
      },
    ],
  },
  {
    id: "6",
    nombre: "Ops. de Seguridad",
    nivel: "SEGURIDAD",
    estado: "ALTA_ROTACION",
    cantidadMiembros: 9,
    idPadre: "2",
    descripcion:
      "Protege los activos organizacionales mediante monitoreo de amenazas, respuesta a incidentes y aplicacion de politicas de seguridad.",
    avatares: ["NR", "BV"],
    vacantes: 3,
    utilizacionPresupuesto: 79,
    retencion: 72,
    lideres: [
      {
        id: "l8",
        nombre: "Nicolas Reyes",
        cargo: "Lider de Operaciones de Seguridad",
        avatar: "NR",
      },
    ],
  },
];

export const obtenerOrgChart = async (): Promise<NodoOrg[]> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return DATOS_MOCK;
};

export const obtenerNodoPorId = async (
  id: string,
): Promise<NodoOrg | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return DATOS_MOCK.find((nodo) => nodo.id === id);
};

export const construirArbol = (nodos: NodoOrg[]): NodoArbol => {
  const mapa = new Map<string, NodoArbol>();
  nodos.forEach((n) => mapa.set(n.id, { ...n, hijos: [] }));

  let raiz: NodoArbol | null = null;
  mapa.forEach((nodo) => {
    if (nodo.idPadre === null) {
      raiz = nodo;
    } else {
      const padre = mapa.get(nodo.idPadre);
      if (padre) padre.hijos.push(nodo);
    }
  });

  if (!raiz) throw new Error("No se encontro nodo raiz en el organigrama");
  return raiz;
};
export type { NodoOrg };

