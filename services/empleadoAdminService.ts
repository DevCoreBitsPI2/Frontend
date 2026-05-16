// services/empleadoAdminService.ts
import { Empleado, EstadoEmpleado, EMPLEADOS_MOCK } from "@/services/empleadosService";

export async function obtenerEmpleadoAdmin(id: string): Promise<Empleado | null> {
  await new Promise((r) => setTimeout(r, 300));
  return EMPLEADOS_MOCK.find((e) => e.id === id) ?? null;
}

export async function cambiarEstadoEmpleado(
  id: string,
  nuevoEstado: EstadoEmpleado,
  motivo: string
): Promise<Empleado> {
  await new Promise((r) => setTimeout(r, 400));
  const empleado = EMPLEADOS_MOCK.find((e) => e.id === id);
  if (!empleado) throw new Error("Empleado no encontrado");
  empleado.estado = nuevoEstado;
  return { ...empleado };
}