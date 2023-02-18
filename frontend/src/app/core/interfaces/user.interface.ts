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
  email: string,
  nombres: string,
  apellidos: string,
  rol: string
}

export interface GetUserResponse {
  user: UserResponse
}