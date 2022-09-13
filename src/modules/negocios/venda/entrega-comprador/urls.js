import { API_BASE } from 'settings'

export const API_LOAD_PENDENTES = `${API_BASE}/negocio/venda/entrega-comprador/visao-comprador/pendentes`
export const API_POST_ENTREGA = `${API_BASE}/negocio/venda/entrega-comprador`
export const API_ARQUIVO = (id) => `${API_BASE}/file/get/reserva/${id}`
