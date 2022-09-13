import REDUCERS from 'modules/reducersConstants'
import ACTIONS from './actionTypes'

import { isArrayNotEmpty, isNotNullOrEmpty } from 'util/utils'

const DEFAULT = {
  isLoadingAll: false,
  contratosAll: [],
  contratosAtivos: [],
  contratosInativos: [],

  isLoadingById: false,
  contrato: null,

  isPosting: false,
  isPutting: false,

  isAtivandoLoading: false,
  isDesativandoLoading: false,

  method: 'POST',
  list: [],
  produtos: undefined,
  editProdutos: undefined,
  editHorarios: undefined,
  isLoadingGrupo: false,
  grupos: undefined
}

export default function (state = DEFAULT, action) {
  if (typeof state === 'undefined') {
    return state
  }

  let contratos = []

  switch (action.type) {
    case ACTIONS.CONTRATO.LOAD.ALL.BEGIN: return { ...state, isLoadingAll: true }
    case ACTIONS.CONTRATO.LOAD.ALL.SUCCESS:
      return {
        ...state,
        isLoadingAll: false,
        contratosAll: action.payload,
        contratosAtivos: getContratosAtivos(action.payload),
        contratosInativos: getContratosInativos(action.payload)
      }
    case ACTIONS.CONTRATO.LOAD.ALL.FAILURE: return { ...state, isLoadingAll: false }

    case ACTIONS.CONTRATO.BYID.BEGIN: return { ...state, isLoadingById: true }
    case ACTIONS.CONTRATO.BYID.SUCCESS: {
      const contrato = action.payload

      if (isArrayNotEmpty(contrato.formasDePagamento)) {
        contrato.formasDePagamento = contrato.formasDePagamento.map(item => {
          if (isNotNullOrEmpty(item.dados)) return { ...item, dados: JSON.parse(item.dados) }
          return item
        })
      }

      return { ...state, isLoadingById: false, contrato: contrato }
    }

    case ACTIONS.CONTRATO.BYID.FAILURE: return { ...state, isLoadingById: false }

    case ACTIONS.CONTRATO.POST.BEGIN: return { ...state, isPosting: true }
    case ACTIONS.CONTRATO.POST.SUCCESS: return { ...state, isPosting: false, contrato: action.payload }
    case ACTIONS.CONTRATO.POST.FAILURE: return { ...state, isPosting: false }

    case ACTIONS.CONTRATO.PUT.BEGIN: return { ...state, isPutting: true }
    case ACTIONS.CONTRATO.PUT.SUCCESS: return { ...state, isPutting: false, contrato: action.payload }
    case ACTIONS.CONTRATO.PUT.FAILURE: return { ...state, isPutting: false }

    case ACTIONS.CONTRATO.ATIVAR.BEGIN:
      contratos = updateListWithStatus(state.contratosAll, action.payload, true, false)
      return {
        ...state,
        isAtivandoLoading: true,
        contratosAll: contratos,
        contratosInativos: getContratosInativos(contratos)
      }
    case ACTIONS.CONTRATO.ATIVAR.SUCCESS:
      contratos = updateListWithStatus(state.contratosAll, action.payload, false, true)
      console.log('ATIVAR: contratos', contratos)
      return {
        ...state,
        isAtivandoLoading: false,
        contratosAll: contratos,
        contratosAtivos: getContratosAtivos(contratos),
        contratosInativos: getContratosInativos(contratos)
      }
    case ACTIONS.CONTRATO.ATIVAR.FAILURE:
      contratos = updateListWithStatus(state.contratosAll, action.payload, false, false)
      return {
        ...state,
        isAtivandoLoading: false,
        contratosAll: contratos,
        contratosInativos: getContratosInativos(contratos)
      }

    case ACTIONS.CONTRATO.DESATIVAR.BEGIN:
      contratos = updateListWithStatus(state.contratosAll, action.payload, true, true)
      return {
        ...state,
        isDesativandoLoading: true,
        contratosAll: contratos,
        contratosAtivos: getContratosAtivos(contratos)
      }
    case ACTIONS.CONTRATO.DESATIVAR.SUCCESS:
      contratos = updateListWithStatus(state.contratosAll, action.payload, false, false)
      console.log('DESATIVAR: contratos', contratos)
      return {
        ...state,
        isDesativandoLoading: false,
        contratosAll: contratos,
        contratosAtivos: getContratosAtivos(contratos),
        contratosInativos: getContratosInativos(contratos)
      }
    case ACTIONS.CONTRATO.DESATIVAR.FAILURE:
      contratos = updateListWithStatus(state.contratosAll, action.payload, false, true)
      return {
        ...state,
        isDesativandoLoading: false,
        contratosAll: contratos,
        contratosAtivos: getContratosAtivos(contratos)
      }

    case 'VRADMIN_EDIT_DATA':
      return { ...state, isLoadingContrato: false, isLoading: false, edit: action.payload, method: 'PATCH' }
    case 'VRADMIN_PRODUTOS_DATA':
      return { ...state, isLoadingProduto: false, produtos: action.payload.itens }
    case REDUCERS.VENDA.CONTRACT_TYPE_DONATION.BEGIN:
      return { ...state, isLoading: true, contracts: { ...state.contracts, donation: {} } }
    case REDUCERS.VENDA.CONTRACT_TYPE_DONATION.SUCCESS:
      return { ...state, isLoading: false, contracts: { ...state.contracts, donation: { ...action.payload } } }
    case REDUCERS.VENDA.CONTRACT_TYPE_DONATION.FAILURE:
      return { ...state, isLoading: false, contracts: { ...state.contracts, donation: {} } }

    default:
      return state
  }
}

function updateListWithStatus (contratos, idContrato, statusUpdating, ativo) {
  console.log('atualizando contrato', idContrato)
  return contratos.map((item) => {
    if (item.id === idContrato) {
      item.statusUpdating = statusUpdating
      item.ativo = ativo
      return item
    } else {
      return item
    }
  })
}

function getContratosAtivos (contratos) {
  return contratos.filter(contrato => contrato.ativo === true)
}

function getContratosInativos (contratos) {
  return contratos.filter(contrato => contrato.ativo !== true)
}
