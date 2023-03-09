export interface User  {
  email: string,
  password: string,
  username?: string,
  token?: string,
  message?: string,
  Role?: string,
  names?: string,
  lastNames?: string
}

export interface UserResponse  {
  message: string,
  token: string,
  userInfo: UserInfo
}

interface UserInfo  {
  _id: string,
  email: string,
  nombres: string,
  apellidos: string,
  rol: string
}

export interface GetUserResponse {
  user: UserResponse
}

export interface GetAllUserResponse {
  _id:              string;
  nombres:          string;
  apellidos:        string;
  email:            string;
  password:         string;
  es_administrador: boolean;
  es_usuario:       boolean;
  esta_activo:      boolean;
  creado_a:         Date;
  actualizado_a:    Date;
}