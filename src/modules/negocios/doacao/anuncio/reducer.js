import ACTIONS from './actionTypes'

const DEFAULT = {
  anuncio: undefined,
  idLoadingById: false,

  isLoading: false,
  list: [],
  edit: undefined,
  diaFailure: false,
  produtos: undefined,
  editProdutos: undefined,
  editHorarios: undefined,
  errors: [],
  isPosting: false,
  isUpdating: false,
  listDia: [],
  hasError: false,
  error: [],
  hasSuccess: false
}

export default function (state = DEFAULT, action) {
  if (typeof state === 'undefined') return state

  switch (action.type) {
    case ACTIONS.ANUNCIO.CLEARERROR: return { ...state, hasError: false, error: [] }
    case ACTIONS.ANUNCIO.CLEARSUCCESS: return { ...state, hasSuccess: false }

    case ACTIONS.ANUNCIO.BYID.BEGIN: return { ...state, idLoadingById: true, hasError: false, hasSuccess: false }
    case ACTIONS.ANUNCIO.BYID.SUCCESS: return { ...state, idLoadingById: false, anuncio: action.payload }
    case ACTIONS.ANUNCIO.BYID.FAILURE: return { ...state, idLoadingById: false, hasError: true, hasSuccess: false, error: action.payload }

    case ACTIONS.ANUNCIO.ADD.BEGIN: return { ...state, isPosting: true, hasError: false, hasSuccess: false }
    case ACTIONS.ANUNCIO.ADD.SUCCESS: return { ...state, isPosting: false, anuncio: action.payload, hasSuccess: true }
    case ACTIONS.ANUNCIO.ADD.FAILURE: return { ...state, isPosting: false, hasError: true, hasSuccess: false, error: action.payload }

    case ACTIONS.ANUNCIO.UPDATE.BEGIN: return { ...state, isUpdating: true, hasError: false, hasSuccess: false }
    case ACTIONS.ANUNCIO.UPDATE.SUCCESS: return { ...state, isUpdating: false, anuncio: action.payload, hasSuccess: true }
    case ACTIONS.ANUNCIO.UPDATE.FAILURE: return { ...state, isUpdating: false, hasError: true, hasSuccess: false, error: action.payload }

    case ACTIONS.ANUNCIO.LOAD.ALL.BEGIN: return { ...state, isLoading: true, edit: undefined, errors: [] }
    case ACTIONS.ANUNCIO.LOAD.ALL.SUCCESS: return { ...state, isLoading: false, list: action.payload, errors: [] }
    case ACTIONS.ANUNCIO.LOAD.ALL.FAILURE: return { ...state, isLoading: false, errors: [] }

    case ACTIONS.ANUNCIO.LOAD.DIA.BEGIN: return { ...state, isLoading: true }
    case ACTIONS.ANUNCIO.LOAD.DIA.SUCCESS: return { ...state, isLoading: false, diaFailure: false, listDia: action.payload.itens }
    case ACTIONS.ANUNCIO.LOAD.DIA.FAILURE: return { ...state, isLoading: false, diaFailure: true }

      // case NOVO_ANUNCIO:
      //   return { ...state, isLoading: false, method: 'POST' }
      // case DETALHES_BEGIN:
      //   return { ...state, isLoading: true, errors: [] }
      // case DETALHES_DATA:
      //   return { ...state, isLoading: false, edit: action.payload, errors: [], method: 'PATCH' }
      // case DETALHES_RESET:
      //   return { ...state, isLoading: false, edit: undefined, errors: [] }
      // case DETALHES_FAIL:
      //   return { ...state, isLoading: false, errors: [] }
      // case GRAVAR_ERRO:
      //   return { ...state, errors: action.payload }
      // case SAVESUCESS:
      //   return { ...state, errors: [] }

    default:
      return state
  }
}
