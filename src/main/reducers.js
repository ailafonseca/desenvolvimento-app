import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'
import { connectRouter } from 'connected-react-router'

import loginReducer from 'modules/login/loginReducer'
import esqueciSenhaReducer from 'modules/esqueci-senha/esqueciSenhaReducer'
import empresaReducer from 'modules/empresa/reducer'

import perfilReducer from 'modules/perfil/reducer'

import {
  VendaContratoReducer,
  VendaAnuncioReducer,
  VendaReservaReducer,
  VendaEntregaAnuncianteReducer,
  VendaEntregaCompradorReducer
} from 'modules/negocios/venda/reducers'

import {
  DoacaoContratoReducer,
  DoacaoAnuncioReducer,
  DoacaoReservaReducer,
  DoacaoEntregaDoadorReducer,
  DoacaoEntregaDonatarioReducer
} from 'modules/negocios/doacao/reducers'

import signupReducer from 'modules/signup/reducers'
import produtotReducer from 'modules/produto/reducers'
import globalReducer from './mainReducer'
import importarProdutos from 'modules/importar-produtos-lote/reducers'

export default (history) =>
  combineReducers({
    // Reducers globais
    main: globalReducer,

    // Reducers entrada
    login: loginReducer,
    cadastro: signupReducer,
    esqueciSenha: esqueciSenhaReducer,

    // Reducers libs
    router: connectRouter(history),
    form: formReducer,
    toastr: toastrReducer,

    empresa: empresaReducer,

    perfil: perfilReducer,

    // Reducers Venda
    vendaContrato: VendaContratoReducer,
    vendaAnuncio: VendaAnuncioReducer,
    vendaVitrine: VendaReservaReducer,
    vendaEntregaComprador: VendaEntregaCompradorReducer,
    vendaEntregaAnunciante: VendaEntregaAnuncianteReducer,

    // Reducers Doacao
    doacaoContrato: DoacaoContratoReducer,
    doacaoAnuncio: DoacaoAnuncioReducer,
    doacaoReserva: DoacaoReservaReducer,
    doacaoEntregaDonatario: DoacaoEntregaDonatarioReducer,
    doacaoEntregaDoador: DoacaoEntregaDoadorReducer,

    // Reducers produtos
    importarProdutos: importarProdutos,
    produto: produtotReducer
  })
