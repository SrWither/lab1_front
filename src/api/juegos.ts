import { api } from './api'
import type {
  ItemLista,
  AddJuegoRequest,
  UpdateJuegoRequest,
  ListarJuegosParams,
  ListarJuegosUsuarioParams,
  Juego,
  SugerenciaRespuesta,
} from './types'

export const listarJuegos = async (params?: ListarJuegosParams): Promise<Juego[]> => {
  const response = await api.get('/juegos', { params })
  return response.data
}

export const obtenerJuego = async (id: string): Promise<Juego> => {
  const response = await api.get(`/juegos/${id}`)
  return response.data
}

export const listarJuegosUsuario = async (
  usuarioId: number,
  params?: ListarJuegosUsuarioParams,
): Promise<ItemLista[]> => {
  const response = await api.get(`/usuarios/${usuarioId}/juegos`, { params })
  return response.data
}

export const agregarJuegoUsuario = async (
  usuarioId: number,
  data: AddJuegoRequest,
): Promise<ItemLista> => {
  const response = await api.post(`/usuarios/${usuarioId}/juegos`, data)
  return response.data
}

export const actualizarJuegoUsuario = async (
  usuarioId: number,
  juegoId: string,
  data: UpdateJuegoRequest,
): Promise<ItemLista> => {
  const response = await api.put(`/usuarios/${usuarioId}/juegos/${juegoId}`, data)
  return response.data
}

export const eliminarJuegoUsuario = async (
  usuarioId: number,
  juegoId: string,
): Promise<{ mensaje: string }> => {
  const response = await api.delete(`/usuarios/${usuarioId}/juegos/${juegoId}`)
  return response.data
}

export const sugerirJuego = async (
  usuarioId: number,
  genero?: string,
): Promise<SugerenciaRespuesta> => {
  const response = await api.get(`/usuarios/${usuarioId}/sugerencia`, {
    params: genero ? { genero } : undefined,
  })
  return response.data
}
