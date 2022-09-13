import { API_BASE } from 'settings'

export const URL_CATEGORIA_LOAD = `${API_BASE}/aux/categoria`
export const URL_CATEGORIA_POST = `${API_BASE}/produto/categoria`

export const URL_PRODUTO_LOAD = `${API_BASE}/produto`
export const URL_PRODUTO_POST = `${API_BASE}/produto`
export const URL_PRODUTO_LOAD_BY_ID_CATEGORIA = (idCategoria) => `${API_BASE}/produto/categoria/${idCategoria}`
export const URL_PRODUTO_LOAD_BY_ID = id => `${API_BASE}/produto/${id}`

export const URL_PRODUTO_IMAGEM_ADD = `${API_BASE}/produto/imagem`
export const URL_PRODUTO_IMAGEM_DELETE = id => `${API_BASE}/produto/imagem/${id}`

export const URL_ESTOQUE_LOTE_POST = `${API_BASE}/produto/movimento-estoque-lote`
