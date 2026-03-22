import { AreaBase, AreaConAdministrador } from "./area";
import { AdministradorBase } from "./administrador";

export interface CargoBase {
  idCargo: number;
  nombre: string;
}

export interface CargoConArea extends CargoBase {
  area: AreaBase;
}

export interface CargoCompleto extends CargoBase {
  area: AreaConAdministrador; // administrador del área
  administrador: AdministradorBase; // Administrador que creó el cargo
}
