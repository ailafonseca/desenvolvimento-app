import { API_BASE } from 'settings'

// external - API
export const API_LOAD_ALL = `${API_BASE}/negocio/doacao/contrato`
export const API_POST = `${API_BASE}/negocio/doacao/contrato`
export const API_PUT = `${API_BASE}/negocio/doacao/contrato`
export const API_LOAD_BYID = (idContrato) => `${API_BASE}/negocio/doacao/contrato/${idContrato}`

export const API_ATIVAR = (idContrato) => `${API_BASE}/negocio/doacao/contrato/ativar/${idContrato}`
export const API_DESATIVAR = (idContrato) => `${API_BASE}/negocio/doacao/contrato/desativar/${idContrato}`

// Internal - url
export const URL_CONTRATO_POST_SUCCESS = (idContrato) => `/doacao/contrato/sucesso/${idContrato}/novo`
export const URL_CONTRATO_PUT_SUCCESS = (idContrato) => `/doacao/contrato/sucesso/${idContrato}/edit`
