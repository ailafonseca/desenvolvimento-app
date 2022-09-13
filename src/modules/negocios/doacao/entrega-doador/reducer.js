import ACTIONS from './actionTypes'

const DEFAULT = {
  isLoadingEntrega: false,
  isLoadingDetalheEntrega: false,
  listaEntregas: [],
  diaFailure: false,
  empresa: {},
  errors: [],
  isPosting: false,
  isPostingFailed: false,
  hasError: false,
  hasSucess: false,
  detalhes: {}
}

export default function (state = DEFAULT, action) {
  switch (action.type) {
    case ACTIONS.ENTREGA.DOADOR.LOAD.ALL.BEGIN: return { ...state, isLoadingEntrega: true, listaEntregas: [], errors: [] }
    case ACTIONS.ENTREGA.DOADOR.LOAD.ALL.SUCCESS: return { ...state, isLoadingEntrega: false, listaEntregas: action.payload, errors: [] }
    case ACTIONS.ENTREGA.DOADOR.LOAD.ALL.FAILURE: return { ...state, isLoadingEntrega: false, errors: [], list: [] }

    case ACTIONS.ENTREGA.DOADOR.POST.BEGIN: return { ...state, isPosting: true, isPostingFailed: false, hasError: false, hasSuccess: false, errors: [] }
    case ACTIONS.ENTREGA.DOADOR.POST.SUCCESS: return { ...state, isPosting: false, isPostingFailed: false, hasSuccess: true }
    case ACTIONS.ENTREGA.DOADOR.POST.FAILURE: return { ...state, isPosting: false, isPostingFailed: true, hasError: true, hasSuccess: false, errors: action.payload }

    case ACTIONS.ENTREGA.DOADOR.CLEARERROR: return { ...state, hasError: false, errors: '' }
    case ACTIONS.ENTREGA.DOADOR.CLEARSUCCESS: return { ...state, hasSuccess: false }

    default:
      return state
  }
}
