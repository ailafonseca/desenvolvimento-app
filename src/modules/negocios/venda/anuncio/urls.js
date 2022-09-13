import { API_BASE } from 'settings'

// external - API
export const API_LOAD_ALL = `${API_BASE}/negocio/venda/anuncio`
export const API_LOAD_BYID = (idAnuncio) => `${API_BASE}/negocio/venda/anuncio/${idAnuncio}`

export const API_ATIVAR = (idAnuncio) => `${API_BASE}/negocio/venda/anuncio/ativar/${idAnuncio}`
export const API_DESATIVAR = (idAnuncio) => `${API_BASE}/negocio/venda/anuncio/desativar/${idAnuncio}`

// Internal - url
export const URL_POST_SUCCESS = (idAnuncio) => `/venda/anuncio/sucesso/${idAnuncio}/novo`
export const URL_PUT_SUCCESS = (idAnuncio) => `/venda/anuncio/sucesso/${idAnuncio}/editar`
export const URL_VENDA_ANUNCIO_LISTAR = () => '/venda/anuncio/listar'
export const URL_VENDA_ANUNCIO_NOVO = (idContrato) => `/venda/anuncio/novo/${idContrato}`
export const URL_VENDA_ANUNCIO_EDITAR = (idAnuncio) => `/venda/anuncio/editar/${idAnuncio}`
