export interface FlujoResponse {
  _id:            string;
  nombre:         string;
  modificador_id: string;
  esta_eliminado: boolean;
  creado_a:       Date;
  actualizado_a:  Date;
  [key: string]: any;
}

export interface Flujo {
  _id:            string;
  nombre:         string;
  modificador_id: string;
  creado_a:       string;
  actualizado_a:  string;
  [key: string]: any;
}

export interface FlujoEdit {
  _id:            string;
  nombre:         string;
  [key: string]: any;
}

export interface FlujoCreate {
  nombre:         string;
  [key: string]: any;
}
export interface FlujoDelete {
  _id:            string;
}

export const flujoNames = {
  compra: 'Compra',
}