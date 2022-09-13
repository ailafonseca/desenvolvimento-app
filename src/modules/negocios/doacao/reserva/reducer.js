import ACTIONS from './actionTypes'

const DEFAULT = {
  isLoading: false,
  diaFailure: false,
  list: [],
  errors: [],
  detalhes: undefined,
  isErrorInApi: false,
  errorWithMessage: []
}

export default function (state = DEFAULT, action) {
  if (typeof state === 'undefined' || action === undefined || action === null) return state

  switch (action.type) {
    case ACTIONS.RESERVA.LOAD.ALL.BEGIN: return { ...state, isLoading: true, list: [], errors: [] }
    case ACTIONS.RESERVA.LOAD.ALL.SUCCESS: return { ...state, isLoading: false, list: action.payload, errors: [] }
    case ACTIONS.RESERVA.LOAD.ALL.FAILURE: return { ...state, isLoading: false, errors: [], list: [] }

    case ACTIONS.RESERVA.LOAD.BYID.BEGIN: return { ...state, isLoading: true, detalhes: undefined, errors: [] }
    case ACTIONS.RESERVA.LOAD.BYID.SUCCESS: return { ...state, isLoading: false, detalhes: action.payload, errors: [] }
    case ACTIONS.RESERVA.LOAD.BYID.FAILURE: return { ...state, isLoading: false, detalhes: undefined, errors: [] }

    case ACTIONS.RESERVA.DIA.BEGIN: return { ...state, isLoading: true, diaFailure: false }
    case ACTIONS.RESERVA.DIA.SUCCESS: return { ...state, isLoading: false, diaFailure: false }
    case ACTIONS.RESERVA.DIA.FAILURE: return { ...state, isLoading: false, diaFailure: true }

    case ACTIONS.RESERVA.ADD.BEGIN: return { ...state, isLoadingBtn: true }
    case ACTIONS.RESERVA.ADD.SUCCESS: return { ...state, isLoadingBtn: false, isErrorInApi: true, errorWithMessage: action.payload }
    case ACTIONS.RESERVA.ADD.FAILURE: return { ...state, isLoadingBtn: false }

    case ACTIONS.RESERVA.CLIENTE.BEGIN: return { ...state, isLoading: true }
    case ACTIONS.RESERVA.CLIENTE.SUCCESS: return { ...state, isLoading: false, allReservas: action.payload }
    case ACTIONS.RESERVA.CLIENTE.FAILURE: return { ...state, isLoading: false }

    default:
      return state
  }
}
