import CONSTS from 'modules/reducersConstants'
import ACTIONS from './actionTypes'

const DEFAULT = {
  isLoading: false,
  diaFailure: false,
  list: [],
  errors: [],
  hasError: false,
  detalhes: undefined,
  isErrorInApi: false,
  errorWithMessage: [],
  etapa: 1
}

export default function (state = DEFAULT, action) {
  if (typeof state === 'undefined' || action === undefined || action === null) return state

  switch (action.type) {
    case ACTIONS.RESERVA.LOAD.ALL.BEGIN:
      return { ...state, isLoading: true, list: [], errors: [] }
    case ACTIONS.RESERVA.LOAD.ALL.SUCCESS:
      return { ...state, isLoading: false, etapa: 1, list: action.payload, errors: [] }
    case ACTIONS.RESERVA.LOAD.ALL.FAILURE:
      return { ...state, isLoading: false, etapa: 1, errors: [], list: [] }

    case ACTIONS.RESERVA.LOAD.DETAILS.BEGIN:
      return { ...state, isLoading: true, detalhes: undefined, errors: [] }
    case ACTIONS.RESERVA.LOAD.DETAILS.SUCCESS:
      return { ...state, isLoading: false, etapa: 1, detalhes: action.payload, errors: [] }
    case ACTIONS.RESERVA.LOAD.DETAILS.FAILURE:
      return { ...state, isLoading: false, etapa: 1, detalhes: undefined, errors: [] }

    case CONSTS.VENDA.RESERVA.DIA.BEGIN:
    case CONSTS.VENDA.RESERVA.DIA.SUCCESS:
      return { ...state, isLoading: false, etapa: 1, diaFailure: false }
    case CONSTS.VENDA.RESERVA.DIA.FAILURE:
      return { ...state, isLoading: false, etapa: 1, diaFailure: true }

    case ACTIONS.RESERVA.SAVE.RESERVA.BEGIN:
      return { ...state, isLoadingBtn: true }
    case ACTIONS.RESERVA.SAVE.RESERVA.SUCCESS:
      return { ...state, isLoadingBtn: false, etapa: 2, detalhes: action.payload }
    case ACTIONS.RESERVA.SAVE.RESERVA.FAILURE:
      return { ...state, isLoadingBtn: false, etapa: 1, error: action.payload, hasError: true }

    case ACTIONS.RESERVA.SAVE.COMPROVANTE.BEGIN:
      return { ...state, isLoadingBtn: true }
    case ACTIONS.RESERVA.SAVE.COMPROVANTE.SUCCESS:
      return { ...state, isLoadingBtn: false, etapa: 3 }
    case ACTIONS.RESERVA.SAVE.COMPROVANTE.FAILURE:
      return { ...state, isLoadingBtn: false, etapa: 2, hasError: true, error: [['Falha upload', action.payload]] }

    case ACTIONS.RESERVA.CLEARERROR:
      console.log('clear error reducer')
      return { ...state, error: [], hasError: false }

    // case VENDA_RESERVA_SALVAR_ERRO_API:
    //   return { ...state, isLoadingBtn: false, isErrorInApi: true, errorWithMessage: action.payload }

    case 'VENDA_LOAD_RESERVAS_CLIENTE_BEGIN':
      return { ...state, isLoading: true }
    case 'VENDA_LOAD_RESERVAS_CLIENTE_END':
      return { ...state, isLoading: false, allReservas: action.payload }
    case 'VENDA_LOAD_RESERVAS_CLIENTE_FAIL':
      return { ...state, isLoading: false }
    default:
      return state
  }
}
