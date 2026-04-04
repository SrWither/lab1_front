import { api } from './api'
import type { AuthLoginRequest, AuthLoginResponse, AuthRegisterInput, Usuario } from './types'

export const registerAuth = async (data: AuthRegisterInput): Promise<Usuario> => {
  const response = await api.post('/auth/registro', data)
  return response.data
}

export const loginAuth = async (data: AuthLoginRequest): Promise<AuthLoginResponse> => {
  const response = await api.post('/auth/login', data)
  return response.data
}

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Token ${token}`
  } else {
    delete api.defaults.headers.common['Authorization']
  }
}
