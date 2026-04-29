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

export type EstadoPerfilUsuario = "ACTIVO" | "INACTIVO";

export interface UserProfile {
  idFuncionario: number;
  nombre: string;
  apellidos: string;
  cargo: string;
  area: string;
  email: string;
  phone: string;
  fechaIngreso: string;
  ubicacion: string;
  foto: string;
  estado: EstadoPerfilUsuario;
  fechaNacimiento: string;
  oficina: string;
  reportaA: string;
}