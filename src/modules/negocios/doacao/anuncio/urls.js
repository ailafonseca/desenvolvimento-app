import { API_BASE } from 'settings'

// external - API
export const API_LOAD_ALL = `${API_BASE}/negocio/doacao/anuncio`
export const API_LOAD_BYID = (idAnuncio) => `${API_BASE}/negocio/doacao/anuncio/${idAnuncio}`
export const API_POST = `${API_BASE}/negocio/doacao/anuncio`
export const API_PUT = `${API_BASE}/negocio/doacao/anuncio`

export const API_ATIVAR = (idAnuncio) => `${API_BASE}/negocio/doacao/anuncio/ativar/${idAnuncio}`
export const API_DESATIVAR = (idAnuncio) => `${API_BASE}/negocio/doacao/anuncio/desativar/${idAnuncio}`

// Internal - url
export const URL_POST_SUCCESS = (idAnuncio) => `/doacao/anuncio/sucesso/${idAnuncio}/novo`
export const URL_PUT_SUCCESS = (idAnuncio) => `/doacao/anuncio/sucesso/${idAnuncio}/editar`
export const URL_DOACAO_ANUNCIO_LISTAR = () => '/doacao/anuncio/listar'
export const URL_DOACAO_ANUNCIO_SEMANUNCIO = () => '/doacao/anuncio/listar'
export const URL_DOACAO_ANUNCIO_NOVO = (idContrato) => `/doacao/anuncio/novo/${idContrato}`
export const URL_DOACAO_ANUNCIO_EDITAR = (idAnuncio) => `/doacao/anuncio/editar/${idAnuncio}`
export const URL_DOACAO_ANUNCIO_DAILY = () => '/doacao/anuncio/hoje'
