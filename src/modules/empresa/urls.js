import { API_BASE } from 'settings'

export const API_LOAD_BYID = idEmpresa => `${API_BASE}/empresas/${idEmpresa}`
export const API_LOAD_GRUPOS = `${API_BASE}/grupo`

export const API_LOAD_ONGS = `${API_BASE}/aux/empresa/ong`
export const API_LOAD_NONGS = `${API_BASE}/aux/empresa/nao-ong`
