import CONSTS from 'modules/reducersConstants'

const DEFAULT = {
  isLoadingEntrega: false,
  isLoadingDetalheEntrega: false,
  listaEntregas: [],
  diaFailure: false,
  empresa: {},
  errors: [],
  isFailedToSaveEntrega: false,
  detalhes: {}
}

const VENDA_TYPE_VITRINE_LOAD_DATA_DONO = 'VENDA_ANUNCIO_VITRINE_LOAD_DATA_DONO'
const VENDA_TYPE_VITRINE_LOAD_EMPRESA = 'VENDA_ANUNCIO_VITRINE_LOAD_EMPRESA'

export default function (state = DEFAULT, action) {
  switch (action.type) {
    case CONSTS.VENDA.ENTREGA.COMPRADOR.LOAD.BEGIN: return { ...state, isLoadingEntrega: true, listaEntregas: [], errors: [] }
    case CONSTS.VENDA.ENTREGA.COMPRADOR.LOAD.SUCCESS: return { ...state, isLoadingEntrega: false, listaEntregas: action.payload, errors: [] }
    case CONSTS.VENDA.ENTREGA.COMPRADOR.LOAD.FAILURE: return { ...state, isLoadingEntrega: false, errors: [], list: [] }

    case VENDA_TYPE_VITRINE_LOAD_DATA_DONO: return { ...state, isLoadingEntrega: false, listDonos: action.payload, errors: [] }
    case VENDA_TYPE_VITRINE_LOAD_EMPRESA: return { ...state, isLoadingEntrega: false, empresa: action.payload, errors: [] }

    case CONSTS.VENDA.ENTREGA.COMPRADOR.BYID.BEGIN: return { ...state, isLoadingDetalheEntrega: true, detalhes: {}, errors: [] }
    case CONSTS.VENDA.ENTREGA.COMPRADOR.BYID.SUCCESS: return { ...state, isLoadingDetalheEntrega: false, detalhes: action.payload, errors: [] }
    case CONSTS.VENDA.ENTREGA.COMPRADOR.BYID.FAILURE: return { ...state, isLoadingDetalheEntrega: false, detalhes: {}, errors: [] }

    case CONSTS.VENDA.ENTREGA.DIA.BEGIN:
    case CONSTS.VENDA.ENTREGA.DIA.SUCCESS: return { ...state, isLoadingEntrega: false, diaFailure: false }
    case CONSTS.VENDA.ENTREGA.DIA.FAILURE: return { ...state, isLoadingEntrega: false, diaFailure: true }

    case CONSTS.VENDA.ENTREGA.COMPRADOR.POST.BEGIN: return { ...state, isLoadingEntrega: true, isFailedToSaveEntrega: false }
    case CONSTS.VENDA.ENTREGA.COMPRADOR.POST.SUCCESS: return { ...state, isLoadingEntrega: false, isFailedToSaveEntrega: false }
    case CONSTS.VENDA.ENTREGA.COMPRADOR.POST.FAILURE: return { ...state, isLoadingEntrega: false, isFailedToSaveEntrega: true }

    default:
      return state
  }
}
