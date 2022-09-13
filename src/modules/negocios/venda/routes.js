import URL from './urls-browser'

import VendaContratoList from './contrato/list'
import VendaContratoEdit from './contrato/edit'
import VendaContratoNew from './contrato/novo'

import VendaAnuncioNew from './anuncio/novo'
import VendaAnuncioEdit from './anuncio/editar'
import VendaAnuncioList from './anuncio/list'
import VendaAnuncioDaily from './anuncio/dia'
import VendaAnuncioError from './anuncio/erroAnuncio'

import VendaReservaList from './reserva/listar'
import VendaReservaDaily from './reserva/dia'
import VendaReservaNew from './reserva/novo'
import VendaReservaError from './reserva/erroReserva'

import VendaEntregaCompradorList from './entrega-comprador/listar'
import VendaEntregaCompradorDaily from './entrega-comprador/dia'
import VendaEntregaCompradorNew from './entrega-comprador/novo'

import VendaEntregaAnuncianteList from './entrega-anunciante/listar'
import VendaEntregaAnuncianteDaily from './entrega-anunciante/dia'
import VendaEntregaAnuncianteNew from './entrega-anunciante/novo'

export default [
  { path: URL.CONTRATO.LISTAR(), component: VendaContratoList },
  { path: URL.CONTRATO.NOVO(), component: VendaContratoNew },
  { path: URL.CONTRATO.EDITAR(), component: VendaContratoEdit },

  { path: URL.ANUNCIO.LISTAR(), component: VendaAnuncioList },
  { path: URL.ANUNCIO.DIA(), component: VendaAnuncioDaily },
  { path: URL.ANUNCIO.EDITAR(), component: VendaAnuncioEdit },
  { path: URL.ANUNCIO.NOVO(), component: VendaAnuncioNew },

  { path: URL.RESERVA.EDITAR(), component: VendaReservaNew },
  { path: URL.RESERVA.LISTAR(), component: VendaReservaList },
  { path: URL.RESERVA.DIA(), component: VendaReservaDaily },
  { path: URL.RESERVA.NOVO(), component: VendaReservaNew },

  { path: URL.ENTREGA.COMPRADOR.LISTAR(), component: VendaEntregaCompradorList },
  { path: URL.ENTREGA.COMPRADOR.DIA(), component: VendaEntregaCompradorDaily },
  { path: URL.ENTREGA.COMPRADOR.NOVO(), component: VendaEntregaCompradorNew },

  { path: URL.ENTREGA.ANUNCIANTE.LISTAR(), component: VendaEntregaAnuncianteList },
  { path: URL.ENTREGA.ANUNCIANTE.DIA(), component: VendaEntregaAnuncianteDaily },
  { path: URL.ENTREGA.ANUNCIANTE.NOVO(), component: VendaEntregaAnuncianteNew },

  { path: '/venda/reserva/erroReserva/:id/:type', component: VendaReservaError },
  { path: '/venda/anuncio/erroAnuncio/:id/:type', component: VendaAnuncioError }
]
