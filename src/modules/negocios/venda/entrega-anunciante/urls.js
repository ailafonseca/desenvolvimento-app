import { API_BASE } from 'settings'

export const API_LOAD_PENDENTES = `${API_BASE}/negocio/venda/entrega-anunciante/pendentes`
export const API_POST_ENTREGA = `${API_BASE}/negocio/venda/entrega-anunciante`
export const API_ARQUIVO = (id) => `${API_BASE}/file/get/reserva/${id}`
