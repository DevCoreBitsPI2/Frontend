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

export async function obtenerEstadisticas(): Promise<EstadisticaDashboard> {
  await new Promise((r) => setTimeout(r, 400));
  return {
    personalActivo: 1248,
    variacionPersonalActivo: 2.4,
    suspendidos: 12,
    estadoSuspendidos: "Stable",
    retiradosYTD: 45,
    variacionRetirados: -1.2,
  };
}

export async function obtenerAlertasContratos(): Promise<AlertaContrato[]> {
  await new Promise((r) => setTimeout(r, 500));
  return [
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
}

export async function obtenerJerarquiaDepartamental(): Promise<NodoOrg[]> {
  await new Promise((r) => setTimeout(r, 450));
  return [
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
}