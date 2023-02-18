export interface CreateTicket {
  prioridad_id: string;
  categoria_id: string;
  contenido: string;
  asunto: string;
  estado_id: string;
  trabajo_flujo_id: string;
}
export interface TicketSelect {
  prioritiesSelect: string;
  categoriesSelect: string;
  contenido: string;
  asunto: string;
}

export interface TicketPostResponse {
  error?: string;
  message: string;
}