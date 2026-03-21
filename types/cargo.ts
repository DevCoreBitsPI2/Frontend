import { AreaBase, AreaConAdministrador } from "./area";
import { AdministradorBase } from "./administrador";

export interface CargoBase {
  idCargo: number;
  nombre: string;
}

// cargo con área simple
export interface CargoConArea extends CargoBase {
  area: AreaBase;
}

// cargo completo (con sus propios administradores)
export interface CargoCompleto extends CargoBase {
  area: AreaConAdministrador; // administrador del área
  administrador: AdministradorBase; // Administrador que creó el cargo
}