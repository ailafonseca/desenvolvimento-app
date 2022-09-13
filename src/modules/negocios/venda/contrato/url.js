import { API_BASE } from 'settings'

// external - API
export const API_LOAD_ALL = `${API_BASE}/negocio/venda/contrato`
export const API_LOAD_BYID = (idContrato) => `${API_BASE}/negocio/venda/contrato/${idContrato}`

export const API_ATIVAR = (idContrato) => `${API_BASE}/negocio/venda/contrato/ativar/${idContrato}`
export const API_DESATIVAR = (idContrato) => `${API_BASE}/negocio/venda/contrato/desativar/${idContrato}`

// Internal - url
export const URL_CONTRATO_POST_SUCCESS = (idContrato) => `/venda/contrato/sucesso/${idContrato}/novo`
export const URL_CONTRATO_PUT_SUCCESS = (idContrato) => `/venda/contrato/sucesso/${idContrato}/edit`
