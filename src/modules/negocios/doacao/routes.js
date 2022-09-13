import URL from './urls-browser'

import DoacaoContratoList from './contrato/list'
import DoacaoContratoEdit from './contrato/edit'
import DoacaoContratoNew from './contrato/novo'

import DoacaoAnuncioNew from './anuncio/novo'
import DoacaoAnuncioEdit from './anuncio/editar'
import DoacaoAnuncioList from './anuncio/list'
import DoacaoAnuncioDaily from './anuncio/dia'
import DoacaoAnuncioError from './anuncio/erroAnuncio'

import DoacaoReservaList from './reserva/listar'
import DoacaoReservaDaily from './reserva/dia'
import DoacaoReservaNew from './reserva/novo'
import DoacaoReservaError from './reserva/erroReserva'

import DoacaoEntregaDonatarioList from './entrega-donatario/listar'
import DoacaoEntregaDonatarioDaily from './entrega-donatario/dia'
import DoacaoEntregaDonatarioNew from './entrega-donatario/novo'

import DoacaoEntregaDoadorList from './entrega-doador/listar'
import DoacaoEntregaDoadorDaily from './entrega-doador/dia'
import DoacaoEntregaDoadorNew from './entrega-doador/novo'

export default [
  { path: URL.CONTRATO.LISTAR(), component: DoacaoContratoList },
  { path: URL.CONTRATO.NOVO(), component: DoacaoContratoNew },
  { path: URL.CONTRATO.EDITAR(), component: DoacaoContratoEdit },

  { path: URL.ANUNCIO.LISTAR(), component: DoacaoAnuncioList },
  { path: URL.ANUNCIO.DIA(), component: DoacaoAnuncioDaily },
  { path: URL.ANUNCIO.EDITAR(), component: DoacaoAnuncioEdit },
  { path: URL.ANUNCIO.NOVO(), component: DoacaoAnuncioNew },

  { path: URL.RESERVA.LISTAR(), component: DoacaoReservaList },
  { path: URL.RESERVA.DIA(), component: DoacaoReservaDaily },
  { path: URL.RESERVA.NOVO(), component: DoacaoReservaNew },
  { path: URL.RESERVA.EDITAR(), component: DoacaoReservaNew },

  { path: URL.ENTREGA.DONATARIO.LISTAR(), component: DoacaoEntregaDonatarioList },
  { path: URL.ENTREGA.DONATARIO.DIA(), component: DoacaoEntregaDonatarioDaily },
  { path: URL.ENTREGA.DONATARIO.NOVO(), component: DoacaoEntregaDonatarioNew },

  { path: URL.ENTREGA.DOADOR.LISTAR(), component: DoacaoEntregaDoadorList },
  { path: URL.ENTREGA.DOADOR.DIA(), component: DoacaoEntregaDoadorDaily },
  { path: URL.ENTREGA.DOADOR.NOVO(), component: DoacaoEntregaDoadorNew },

  { path: '/doacao/reserva/erroReserva/:id/:type', component: DoacaoReservaError },
  { path: '/doacao/anuncio/erroAnuncio/:id/:type', component: DoacaoAnuncioError }
]
