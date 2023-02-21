import { HttpHeaders, HttpParams } from "@angular/common/http";

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

export interface ApiOptions {
  headers?: HttpHeaders;
  params?: HttpParams;
}

export interface TicketGetResponse {
  _id:              string;
  asunto:           string;
  contenido:        string;
  estado_id:        string;
  prioridad_id:     string;
  creador_id:       string;
  categoria_id:     string;
  trabajo_flujo_id: string;
  modificador_id?:  string;
  esta_eliminado:   boolean;
  flujo_actual:     FlujoActual[];
}

export interface FlujoActual {
  _id:             string;
  ticket_id:       string;
  flujo_paso_id:   string;
  creador_id:      string;
  compleado_a?:    string;
  asignado_id?:    string;
  esta_completado: boolean;
  modificador_id?: string;
  esta_eliminado:  boolean;
  creado_a:        Date;
  actualizado_a:   Date;
}