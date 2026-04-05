export type Usuario = {
  id: number
  nombre: string
}

export type Juego = {
  id: string
  nombre: string
  genero: string
  lanzamiento: string
  plataforma: string
  descripcion: string
}

export type AddJuegoRequest = {
  juego_id: string
  tengo: boolean
  quiero: boolean
  jugado: boolean
  me_gusta: boolean
}

export type ItemLista = {
  id: string
  nombre: string
  genero?: string
  lanzamiento?: string
  plataforma?: string
  descripcion: string
  tengo: boolean
  quiero: boolean
  jugado: boolean
  me_gusta: boolean
  fecha_agregado: string
}

export type UpdateJuegoRequest = Partial<{
  tengo: boolean
  quiero: boolean
  jugado: boolean
  me_gusta: boolean
}>

export type SugerenciaRespuesta = {
  id?: string
  nombre: string
  descripcion: string
  genero?: string
  lanzamiento?: string
  plataforma?: string
}

export type AuthRegisterInput = {
  username: string
  nombre: string
  password: string
}

export type AuthLoginRequest = {
  username: string
  password: string
}

export type AuthLoginResponse = {
  token: string
}

export type ListarJuegosParams = {
  q?: string
  fuente?: 'local' | 'wikidata'
  genero?: string
  ordenar?: 'nombre' | 'lanzamiento' | 'genero' | 'id'
  orden?: 'asc' | 'desc'
}

export type ListarJuegosUsuarioParams = {
  genero?: string
  ordenar?: 'nombre' | 'fecha_lanzamiento' | 'fecha_agregado'
  orden?: 'asc' | 'desc'
}
