import ACTIONS from './reducerTypes'
import { isArrayEmpty } from 'util/utils'

const DEFAULT = {
  produtos: [],
  isLoadingProdutos: false,
  categorias: [],
  isLoadingCategorias: false,
  item: [],
  isLoadingById: false,
  isDeletingImage: false,
  isPostingImagem: false,
  isEstoqueLotePosting: false
}

export default function (state = DEFAULT, action) {
  if (typeof state === 'undefined') {
    return state
  }

  switch (action.type) {
    case ACTIONS.PRODUTO.LOAD.BEGIN: return { ...state, isLoadingProdutos: true }
    case ACTIONS.PRODUTO.LOAD.SUCCESS:
      var produtosAntigos = state.produtos

      if (!isArrayEmpty(produtosAntigos)) {
        produtosAntigos = produtosAntigos.map(produto => {
          const novoProduto = action.payload.itens.find(p => p.idProduto === produto.idProduto)
          if (novoProduto) {
            produto.estoque = novoProduto.estoque
            produto.preco = produto.precoBase = novoProduto.precoBase
            produto.unidade = produto.unidadeBase = novoProduto.unidadeBase
          }
          produto.novoEstoque = undefined
          return produto
        })
      }

      var novosProdutos = action.payload.itens.filter(p => !produtosAntigos.some(x => x.idProduto === p.idProduto))

      return {
        ...state,
        isLoadingProdutos: false,
        produtos: [...produtosAntigos, ...novosProdutos]
      }
    case ACTIONS.PRODUTO.LOAD.FAILURE: return { ...state, isLoadingProdutos: false }

    case ACTIONS.PRODUTO.BYID.BEGIN: return { ...state, isLoadingById: true }
    case ACTIONS.PRODUTO.BYID.SUCCESS: return { ...state, isLoadingById: false, item: action.payload }
    case ACTIONS.PRODUTO.BYID.FAILURE: return { ...state, isLoadingById: false }

    case ACTIONS.CATEGORIA.LOAD.BEGIN: return { ...state, isLoadingCategorias: true }
    case ACTIONS.CATEGORIA.LOAD.SUCCESS: return { ...state, isLoadingCategorias: false, categorias: action.payload }
    case ACTIONS.CATEGORIA.LOAD.FAILURE: return { ...state, isLoadingCategorias: false }

    case ACTIONS.PRODUTO.IMAGENS.DELETE.BEGIN: return { ...state, isDeletingImage: true }
    case ACTIONS.PRODUTO.IMAGENS.DELETE.SUCCESS: return { ...state, isDeletingImage: false, item: { ...state.item, imagens: [] } }
    case ACTIONS.PRODUTO.IMAGENS.DELETE.FAILURE: return { ...state, isDeletingImage: false }

    case ACTIONS.PRODUTO.IMAGENS.POST.BEGIN: return { ...state, isPostingImagem: true }
    case ACTIONS.PRODUTO.IMAGENS.POST.SUCCESS: return { ...state, isPostingImagem: false, item: { ...state.item, imagens: [...action.payload.imagens] } }
    case ACTIONS.PRODUTO.IMAGENS.POST.FAILURE: return { ...state, isPostingImagem: false }

    case ACTIONS.ESTOQUE.LOTE.POST.BEGIN: return { ...state, isEstoqueLotePosting: true }
    case ACTIONS.ESTOQUE.LOTE.POST.SUCCESS: return { ...state, isEstoqueLotePosting: false, item: action.payload }
    case ACTIONS.ESTOQUE.LOTE.POST.FAILURE: return { ...state, isEstoqueLotePosting: false }

    default:
      return state
  }
}
