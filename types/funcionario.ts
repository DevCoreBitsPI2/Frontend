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
  cargo: CargoBase;
}

export type RegistroDTO = {
  nombre: string;
  apellidos: string;
  correo: string;
  password: string;
  cargoId: number;
};