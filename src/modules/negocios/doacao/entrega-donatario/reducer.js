import ACTIONS from './actionTypes'

const DEFAULT = {
  isLoadingEntrega: false,
  isLoadingDetalheEntrega: false,
  listaEntregas: [],
  diaFailure: false,
  empresa: {},
  errors: [],
  isFailedToSaveEntrega: false,
  hasError: false,
  hasSucess: false,
  detalhes: {}
}

export default function (state = DEFAULT, action) {
  switch (action.type) {
    case ACTIONS.ENTREGA.DONATARIO.LOAD.ALL.BEGIN: return { ...state, isLoadingEntrega: true, listaEntregas: [], errors: [] }
    case ACTIONS.ENTREGA.DONATARIO.LOAD.ALL.SUCCESS: return { ...state, isLoadingEntrega: false, listaEntregas: action.payload, errors: [] }
    case ACTIONS.ENTREGA.DONATARIO.LOAD.ALL.FAILURE: return { ...state, isLoadingEntrega: false, errors: [], list: [] }

    case ACTIONS.ENTREGA.DONATARIO.POST.BEGIN: return { ...state, isLoadingEntrega: true, isFailedToSaveEntrega: false, hasError: false, hasSuccess: false, errors: [] }
    case ACTIONS.ENTREGA.DONATARIO.POST.SUCCESS: return { ...state, isLoadingEntrega: false, isFailedToSaveEntrega: false, hasSuccess: true }
    case ACTIONS.ENTREGA.DONATARIO.POST.FAILURE: return { ...state, isLoadingEntrega: false, isFailedToSaveEntrega: true, hasError: true, hasSuccess: false, errors: action.payload }

    case ACTIONS.ENTREGA.DONATARIO.CLEARERROR: return { ...state, hasError: false, errors: '' }
    case ACTIONS.ENTREGA.DONATARIO.CLEARSUCCESS: return { ...state, hasSuccess: false }

    default:
      return state
  }
}
