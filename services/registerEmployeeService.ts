// Servicio mock para el formulario de registro de empleado
export interface Position {
  id: string;
  nombre: string;
  areaId: string;
}

export const DOCUMENT_TYPES = [
  { id: 'dni', nombre: 'DNI' },
  { id: 'passport', nombre: 'Passport' },
  { id: 'ce', nombre: 'Carnet de Extranjeria' },
];

export const CONTRACT_TYPES = [
  { id: 'fulltime', nombre: 'Full Time' },
  { id: 'parttime', nombre: 'Part Time' },
  { id: 'temporal', nombre: 'Temporal' },
];

export const AREAS_MOCK = [
  { id: '1', nombre: 'Ingenieria' },
  { id: '2', nombre: 'Recursos Humanos' },
  { id: '3', nombre: 'Finanzas' },
];

export const POSITIONS_MOCK: Position[] = [
  { id: 'p1', nombre: 'Software Engineer', areaId: '1' },
  { id: 'p2', nombre: 'QA Engineer', areaId: '1' },
  { id: 'p3', nombre: 'HR Specialist', areaId: '2' },
  { id: 'p4', nombre: 'Accountant', areaId: '3' },
];

export interface RegisterPayload {
  fullName: string;
  documentType: string;
  documentNumber: string;
  email: string;
  phone: string;
  photo?: string; // data URL
  files?: { name: string; size: number; type: string }[];
  areaId?: string;
  positionId?: string;
  hireDate?: string;
  contractType?: string;
}

export const enviarRegistroMock = async (payload: RegisterPayload) => {
  await new Promise((r) => setTimeout(r, 800));
  // generar id tipo EMP-YYYY-NNN
  const year = new Date().getFullYear();
  const random = String(Math.floor(Math.random() * 900) + 100);
  return { success: true, employeeId: `EMP-${year}-${random}`, payload };
};
