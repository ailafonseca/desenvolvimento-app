import { API_BASE } from 'settings'

// API urls
export const API_LOAD_BYID = (idReservaInteracao) => `${API_BASE}/negocio/venda/reserva/${idReservaInteracao}`
export const API_DAILY_ID = `${API_BASE}/negocio/venda/reserva/getdailyid`

// Internal - url
export const URL_VENDA_RESERVA_LISTAR = () => '/venda/reserva/listar'
// export const URL_POST_SUCCESS = (idAnuncio) => `/venda/anuncio/sucesso/${idAnuncio}/novo`
// export const URL_PUT_SUCCESS = (idAnuncio) => `/venda/anuncio/sucesso/${idAnuncio}/editar`
// export const URL_VENDA_ANUNCIO_NOVO = (idContrato) => `/venda/anuncio/novo/${idContrato}`
// export const URL_VENDA_ANUNCIO_EDITAR = (idAnuncio) => `/venda/anuncio/editar/${idAnuncio}`