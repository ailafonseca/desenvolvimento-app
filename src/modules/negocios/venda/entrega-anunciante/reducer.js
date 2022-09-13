import CONSTS from 'modules/reducersConstants'

const DEFAULT = {
  isLoadingEntrega: false,
  isLoadingDetalheEntrega: false,
  listaEntregas: [],
  diaFailure: false,
  empresa: {},
  errors: [],
  isPosting: false,
  isPostingFailed: false,
  detalhes: {}
}

const VENDA_TYPE_VITRINE_LOAD_DATA_DONO = 'VENDA_ANUNCIO_VITRINE_LOAD_DATA_DONO'
const VENDA_TYPE_VITRINE_LOAD_EMPRESA = 'VENDA_ANUNCIO_VITRINE_LOAD_EMPRESA'

export default function (state = DEFAULT, action) {
  switch (action.type) {
    case CONSTS.VENDA.ENTREGA.ANUNCIANTE.LOAD.BEGIN: return { ...state, isLoadingEntrega: true, listaEntregas: [], errors: [] }
    case CONSTS.VENDA.ENTREGA.ANUNCIANTE.LOAD.SUCCESS: return { ...state, isLoadingEntrega: false, listaEntregas: action.payload, errors: [] }
    case CONSTS.VENDA.ENTREGA.ANUNCIANTE.LOAD.FAILURE: return { ...state, isLoadingEntrega: false, errors: [], list: [] }

    case VENDA_TYPE_VITRINE_LOAD_DATA_DONO: return { ...state, isLoadingEntrega: false, listDonos: action.payload, errors: [] }
    case VENDA_TYPE_VITRINE_LOAD_EMPRESA: return { ...state, isLoadingEntrega: false, empresa: action.payload, errors: [] }

    case CONSTS.VENDA.ENTREGA.ANUNCIANTE.BYID.BEGIN: return { ...state, isLoadingDetalheEntrega: true, detalhes: {}, errors: [] }
    case CONSTS.VENDA.ENTREGA.ANUNCIANTE.BYID.SUCCESS: return { ...state, isLoadingDetalheEntrega: false, detalhes: action.payload, errors: [] }
    case CONSTS.VENDA.ENTREGA.ANUNCIANTE.BYID.FAILURE: return { ...state, isLoadingDetalheEntrega: false, detalhes: {}, errors: [] }

    case CONSTS.VENDA.ENTREGA.DIA.BEGIN:
    case CONSTS.VENDA.ENTREGA.DIA.SUCCESS: return { ...state, isLoadingEntrega: false, diaFailure: false }
    case CONSTS.VENDA.ENTREGA.DIA.FAILURE: return { ...state, isLoadingEntrega: false, diaFailure: true }

    case CONSTS.VENDA.ENTREGA.ANUNCIANTE.POST.BEGIN: return { ...state, isPosting: true, isPostingFailed: false }
    case CONSTS.VENDA.ENTREGA.ANUNCIANTE.POST.SUCCESS: return { ...state, isPosting: false, isPostingFailed: false }
    case CONSTS.VENDA.ENTREGA.ANUNCIANTE.POST.FAILURE: return { ...state, isPosting: false, isPostingFailed: true }

    default:
      return state
  }
}
