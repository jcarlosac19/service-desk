export interface GroupResponse {
  _id:            string;
  nombre:         string;
  color:          string;
  creador_id:     string;
  modificador_id: string;
  creado_a:       Date;
  actualizado_a:  Date;
  [key: string]: any;
}

export interface GroupEdit {
  nombre:         string;
  color:          string;
  creador_id:     string;
  modificador_id: string;
  actualizado_a:  Date;
}

export interface GroupDelete {
  _id:            string;
}