import { API_BASE } from 'settings'

// Anuncio
export const URL_DR_ANUNCIO_BASE = `${API_BASE}/negocio/doacao/AnuncioDoacao`
export const URL_DR_ANUNCIO_SEM_ANUNCIO_HOJE = `${URL_DR_ANUNCIO_BASE}/semanuncio`
export const URL_DR_ANUNCIO_DETALHADO = (id) => `${URL_DR_ANUNCIO_BASE}/${id}`
export const URL_VR_ANUNCIO_BASE = `${API_BASE}/negocio/doacao/Anuncio`

// Anuncio Assinante
export const URL_DR_RESERVA_LIST = `${API_BASE}/negocio/doacao/anuncio/assinante/reserva`
export const URL_DR_COLETA_LISTA = `${API_BASE}/negocio/doacao/anuncio/assinante/coleta`

// AnuncioRelatorio
export const URL_DR_ANUNCIO_RELATORIO = `${URL_DR_ANUNCIO_BASE}/relatorio`

// Categoria
export const URL_OBTER_CATEGORIAS = `${API_BASE}/aux/Categoria`

// ContatoNotificacao
export const URL_CONTATO_NOTIFICACAO_FUNCIONARIOS = `${API_BASE}/negocio/doacao/ContatoNotificacao/funcionarios`
export const URL_CONTATO_NOTIFICACAO_TERCEIROS = `${API_BASE}/negocio/doacao/ContatoNotificacao/terceiros`

// Doação Recorrente - Contrato
export const URL_DR_CONTRATO_BASE = `${API_BASE}/negocio/ContratoDoacao`
export const URL_DR_CONTRATO_POR_ID = (id) => `${URL_DR_CONTRATO_BASE}/${id}`
export const URL_DR_CONTRATO_DAILYURL = `${URL_DR_CONTRATO_BASE}/hoje`
export const URL_DR_CONTRATO_ATIVAR = `${URL_DR_CONTRATO_BASE}/ativar/`
export const URL_DR_CONTRATO_DESATIVAR = `${URL_DR_CONTRATO_BASE}/desativar`
export const URL_DR_CONTRATO_ATIVAR_POR_ID = (id) => `${URL_DR_CONTRATO_BASE}/ativar/${id}`
export const URL_DR_CONTRATO_DESATIVAR_POR_ID = (id) => `${URL_DR_CONTRATO_BASE}/desativar/${id}`

// Doação Recorrente - Contrato
export const URL_VR_CONTRATO_BASE = `${API_BASE}/negocio/venda/ContratoVenda`
export const URL_VR_CONTRATO_POR_ID = (id) => `${URL_DR_CONTRATO_BASE}/${id}`
export const URL_VR_CONTRATO_DAILYURL = `${URL_DR_CONTRATO_BASE}/hoje`
export const URL_VR_CONTRATO_ATIVAR = `${URL_DR_CONTRATO_BASE}/ativar/`
export const URL_VR_CONTRATO_DESATIVAR = `${URL_DR_CONTRATO_BASE}/desativar`
export const URL_VR_CONTRATO_ATIVAR_POR_ID = (id) => `${URL_DR_CONTRATO_BASE}/ativar/${id}`
export const URL_VR_CONTRATO_DESATIVAR_POR_ID = (id) => `${URL_DR_CONTRATO_BASE}/desativar/${id}`

// Doação Recorrente - Empresa
export const URL_CADASTRO_EMPRESA = `${API_BASE}/cadastro/empresa`
export const URL_OBTER_EMPRESA = (id) => `${URL_CADASTRO_EMPRESA}/${id}`
export const URL_AUX_EMPRESA_ONG = `${API_BASE}/aux/Empresa/ong`
export const URL_AUX_EMPRESA_NAO_ONG = `${API_BASE}/aux/Empresa/nao-ong`

// Health
export const URL_HEALTH = `${API_BASE}/Health`

// Intencoes
export const URL_CADASTRO_DESEJOS = `${URL_CADASTRO_EMPRESA}/intencoes`

// Login
export const URL_LOGIN_BASE = `${API_BASE}/login`
export const URL_LOGIN_NEWTOKEN = `${API_BASE}/login/newtoken`
export const URL_REDEFINIR_SENHA = `${URL_LOGIN_BASE}/changepassword`

// Ping
export const URL_PING_BASE = `${API_BASE}/Ping`
export const URL_PING_HORARIO_SERVIDOR = `${URL_PING_BASE}/sdate`
export const URL_PING_HORARIO_BRASILIA = `${URL_PING_BASE}/date`
export const URL_PING_TIMEZONES = `${URL_PING_BASE}/tzs`
export const URL_PING_BY_ID = (id) => `${URL_PING_BASE}/${id}`
export const URL_PING_VERSAO = `${URL_PING_BASE}/version`

// Doação Recorrente - Produto
export const URL_PRODUTO_BASE = `${API_BASE}/Produto`
export const URL_PRODUTO_BY_ID = (id) => `${URL_PRODUTO_BASE}/${id}`
export const URL_PRODUTO_PLANILHA = `${URL_PRODUTO_BASE}/planilha`
export const URL_PRODUTO_PLANILHA_BY_CODIGO = (codigoProduto) => `${URL_PRODUTO_PLANILHA}/${codigoProduto}`
export const URL_PRODUTOS_BY_CATEGORIA = (idCategoria) => `${URL_PRODUTO_BASE}/categoria/${idCategoria}`
export const URL_PRODUTO_CATEGORIA = `${URL_PRODUTO_BASE}/categoria`
export const URL_PRODUTO_IMAGEM = `${URL_PRODUTO_BASE}/imagem`
export const URL_PRODUTO_DELETE_IMAGEM = (idImagem) => `${URL_PRODUTO_BASE}/imagem/${idImagem}`

// Recuperar Senha
export const URL_RECUPERAR_SENHA = `${API_BASE}/RecuperarSenha`
export const URL_ALTERAR_SENHA = `${API_BASE}/RecuperarSenha/alterarsenha`

// Doação Recorrente - Reserva
export const URL_DR_RESERVA_BASE = `${API_BASE}/negocio/doacao/reserva`
export const URL_DR_RESERVA_BY_ID = (id) => `${URL_DR_RESERVA_BASE}/${id}`
export const URL_DR_RESERVA_DAILYURL = `${URL_DR_RESERVA_BASE}/getdailyid`
export const URL_DR_COLETA_COMPRADOR = `${URL_DR_RESERVA_BASE}/coleta`
export const URL_DR_COLETA_REVISAO = `${URL_DR_RESERVA_BASE}/revisao`

// Grupos Doação
export const URL_DOACAO_GRUPOS_BASE = `${API_BASE}/Grupo`

// Usuario
export const URL_USUARIO = `${API_BASE}/cadastro/usuario`

// EXPORTS ANTIGOS
export const URL_DR_RESERVA_CANCEL = `${API_BASE}/negocio/doacao/reserva/retirada/cancelar`
export const URL_DR_COLETA_BASE = `${API_BASE}/negocio/doacao/reserva`
export const URL_DR_COLETA_COMPRADOR_DAILY = `${API_BASE}/negocio/doacao/reserva/revisao`
export const URL_DR_COLETA_REVISAO_DAILY = `${API_BASE}/negocio/doacao/reserva/revisao`
export const URL_CADASTRO_USUARIO = `${API_BASE}/cadastro/usuario`
export const URL_CADASTRO_EMPRESA_BASE = `${API_BASE}/empresas`

// -------------------- V E N D A  -------------------- //
export const URL_VENDA = `${API_BASE}/negocio/venda`

// Venda - Contrato
export const URL_VENDA_CONTRATO_BASE = `${URL_VENDA}/contrato`
export const URL_VENDA_CONTRATO_DIA = `${URL_VENDA_CONTRATO_BASE}/hoje`
export const URL_VENDA_CONTRATO_ATIVAR = `${URL_VENDA_CONTRATO_BASE}/ativar`
export const URL_VENDA_CONTRATO_DESATIVAR = `${URL_VENDA_CONTRATO_BASE}/desativar`

// Grupos-Venda
export const URL_VENDA_GRUPOS_BASE = `${API_BASE}/Grupo`

// Venda - Anuncio
export const URL_VENDA_ANUNCIO_BASE = `${URL_VENDA}/anuncio`
export const URL_VENDA_ANUNCIO_DIA = `${URL_VENDA_CONTRATO_BASE}/hoje`
export const URL_VENDA_ANUNCIO_ATIVAR = `${URL_VENDA_CONTRATO_BASE}/ativar`
export const URL_VENDA_ANUNCIO_DESATIVAR = `${URL_VENDA_CONTRATO_BASE}/desativar`

// Reserva
export const URL_VENDA_RESERVA_LIST = `${URL_VENDA_ANUNCIO_BASE}/assinante/reserva`

export const URL_EDIT_RESERVA = (id) => `${API_BASE}}/negocio/venda/reserva/${id}`
export const URL_VR_ENTREGA_REVISAO = `${API_BASE}/negocio/venda/reserva/revisao`
export const URL_VR_RESERVA_BASE = `${API_BASE}/negocio/venda/reserva`
export const URL_VR_RESERVA_CANCEL = `${API_BASE}/negocio/venda/reserva/entrega/cancelar`

export const URL_VENDA_ENTREGA_COMPRADOR_PENDENTES = `${API_BASE}/negocio/venda/entrega-comprador/visao-comprador/pendentes`
export const URL_VENDA_ENTREGA_COMPRADOR_CADASTRADOS = `${API_BASE}/negocio/venda/entrega-comprador/visao-comprador/realizadas`
export const URL_VENDA_CONTRATO_DAILYURL = `${URL_VENDA_CONTRATO_BASE}/hoje`
export const URL_VENDA_RESERVA_CLIENTE_BASE = `${API_BASE}/negocio/venda/reserva/cliente`
export const URL_VENDA_ENTREGA_ANUNCIANTE = `${API_BASE}/negocio/venda/entrega-anunciante`

export const URL_FILE_SAVE = `${API_BASE}/file/save`
export const URL_FILE_RESERVA_LOAD = (id) => `${API_BASE}/file/reserva/:id`
