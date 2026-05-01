// services/dashboardService.ts
import { ContratoBase } from "@/types/contrato";
import { NodoOrg } from "@/types/orgChart";

export interface EstadisticaDashboard {
  personalActivo: number;
  variacionPersonalActivo: number;
  suspendidos: number;
  estadoSuspendidos: "Stable" | "Up" | "Down";
  retiradosYTD: number;
  variacionRetirados: number;
}

export interface AlertaContrato extends ContratoBase {
  nombre: string;
  codigoContrato: string;
  departamento: string; // string simple, no AreaBase, para consistencia con el componente
  diasRestantes: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const DASHBOARD_ENDPOINTS = {
  estadisticas: "/dashboard/estadisticas",
  alertas: "/dashboard/alertas-contratos",
  jerarquia: "/dashboard/jerarquia-departamental",
} as const;

const MOCK_ESTADISTICAS: EstadisticaDashboard = {
  personalActivo: 1248,
  variacionPersonalActivo: 2.4,
  suspendidos: 12,
  estadoSuspendidos: "Stable",
  retiradosYTD: 45,
  variacionRetirados: -1.2,
};

const MOCK_ALERTAS: AlertaContrato[] = [
  {
    idContrato: 1,
    nombre: "Líder de Auditoría Externa",
    codigoContrato: "CN-8829",
    departamento: "Departamento Financiero",
    diasRestantes: 4,
    condiciones: "Contrato externo",
    tipo: "Externo",
    vigencia: "vigente",
    fechaInicio: "2023-01-01",
    fechaFin: "Oct 24, 2023",
  },
  {
    idContrato: 2,
    nombre: "Director de Seguridad",
    codigoContrato: "CN-1102",
    departamento: "Operaciones",
    diasRestantes: 12,
    condiciones: "Contrato de seguridad",
    tipo: "Interno",
    vigencia: "vigente",
    fechaInicio: "2023-01-01",
    fechaFin: "Nov 02, 2023",
  },
  {
    idContrato: 3,
    nombre: "Arquitecto de Infraestructura",
    codigoContrato: "CN-5541",
    departamento: "Departamento de Ingeniería",
    diasRestantes: 21,
    condiciones: "Contrato de infraestructura",
    tipo: "Interno",
    vigencia: "vigente",
    fechaInicio: "2023-01-01",
    fechaFin: "Nov 11, 2023",
  },
];

const MOCK_JERARQUIA: NodoOrg[] = [
  {
    id: "1",
    nombre: "Junta de Operaciones",
    nivel: "EJECUTIVO",
    estado: "ACTIVO",
    cantidadMiembros: 6,
    idPadre: null,
    descripcion: "Nivel ejecutivo principal",
    avatares: [],
    vacantes: 1,
    utilizacionPresupuesto: 60,
    retencion: 95,
    lideres: [],
  },
  {
    id: "2",
    nombre: "Departamento de Ingeniería",
    nivel: "TECNICO",
    estado: "ACTIVO",
    cantidadMiembros: 142,
    idPadre: "1",
    descripcion: "Departamento técnico",
    avatares: [],
    vacantes: 5,
    utilizacionPresupuesto: 89,
    retencion: 88,
    lideres: [],
  },
  {
    id: "3",
    nombre: "Cumplimiento Corporativo",
    nivel: "GESTION",
    estado: "ESTABLE",
    cantidadMiembros: 84,
    idPadre: "1",
    descripcion: "Cumplimiento corporativo",
    avatares: [],
    vacantes: 2,
    utilizacionPresupuesto: 70,
    retencion: 91,
    lideres: [],
  },
];

async function solicitarDatos<T>(endpoint: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Error al consultar ${endpoint}`);
    }

    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

export async function obtenerEstadisticas(): Promise<EstadisticaDashboard> {
  return solicitarDatos(DASHBOARD_ENDPOINTS.estadisticas, MOCK_ESTADISTICAS);
}

export async function obtenerAlertasContratos(): Promise<AlertaContrato[]> {
  return solicitarDatos(DASHBOARD_ENDPOINTS.alertas, MOCK_ALERTAS);
}

export async function obtenerJerarquiaDepartamental(): Promise<NodoOrg[]> {
  return solicitarDatos(DASHBOARD_ENDPOINTS.jerarquia, MOCK_JERARQUIA);
}