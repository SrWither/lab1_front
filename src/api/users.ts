import { api } from './api'
import type { Usuario } from './types'

export const getCurrentUser = async (): Promise<Usuario> => {
  const response = await api.get('/usuarios/yo')
  return response.data
}

export const getUserById = async (id: number): Promise<Usuario> => {
  const response = await api.get(`/usuarios/${id}`)
  return response.data
}

export const getAllUsers = async (): Promise<Usuario[]> => {
  const response = await api.get('/usuarios')
  return response.data
}

export const updateUser = async (id: number, data: Partial<Usuario>): Promise<Usuario> => {
  const response = await api.put(`/usuarios/${id}`, data)
  return response.data
}

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/usuarios/${id}`)
}
