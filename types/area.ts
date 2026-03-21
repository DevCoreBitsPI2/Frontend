import { AdministradorBase } from "./administrador";

export interface AreaBase {
  idArea: number;
  nombre: string;
}

export interface AreaConAdministrador extends AreaBase {
  administrador: AdministradorBase; // Administrador que creó el área
}