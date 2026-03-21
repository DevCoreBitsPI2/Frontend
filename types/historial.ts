import { TipoHistorial } from "./enums";
import { EvaluacionDesempenio } from "./evaluacion";

export interface HistorialBase {
  idRegistro: number;
  descripcion: string;
  fecha: string;
  tipo: TipoHistorial;
}

export interface HistorialConEvaluacion extends HistorialBase {
  evaluacion?: EvaluacionDesempenio;
}