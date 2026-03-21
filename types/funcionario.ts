import { EstadoFuncionario } from "./enums";
import { CargoBase, CargoCompleto } from "./cargo";
import { ContratoBase } from "./contrato";
import { HistorialBase } from "./historial";

export interface FuncionarioBase {
  idFuncionario: number;
  nombre: string;
  apellidos: string;
  correo: string;
  estado: EstadoFuncionario;
  salario: number;
}