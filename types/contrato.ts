import { EstadoContrato } from "./enums";

export interface ContratoBase {
  idContrato: number;
  condiciones: string;
  tipo: string;
  vigencia: EstadoContrato;
  fechaInicio: string;
  fechaFin: string;
}