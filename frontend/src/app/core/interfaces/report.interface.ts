export interface ReportRequest {
  dateStart: Date;
  dateEnd: Date;
}

export interface ReportResponse {
  ticketId: number;
  email_creador: string;
  asignado?: string;
  creado_a: string;
  compleado_a: string;
  email_asignado?: string;
  nombreDepartamento?: string;
  tiempoEstimadoResolucion?: string;
  tiempoRealResolucion?: string;
  percentageSLA?: string;
}
