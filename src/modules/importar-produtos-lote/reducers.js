import {
  IMPORTAR_PRODUTOS_LOTE,
  ADICIONAR_NOVO_PRODUTO,
  LOAD_CATEGORIAS_BEGIN,
  CLEAR_ALL_PRODUCTS,
  ENVIAR_PRODUTO_BEGIN,
  ENVIAR_PRODUTO_SUCCESS,
  ENVIAR_PRODUTO_FAIL,
  DELETE_PRODUTO,
  ADD_PRODUTO,
} from "./actionTypes";
import status from "./statusConstants";

export default function importarProdutos(state = { categorias: [], produtos: [] }, action) {
  let produtosAtualizados;
  switch (action.type) {
    case IMPORTAR_PRODUTOS_LOTE:
      return {
        ...state,
        produtos: action.payload,
      };
    case CLEAR_ALL_PRODUCTS:
      return { ...state, produtos: [] };
    case ENVIAR_PRODUTO_BEGIN:
      produtosAtualizados = state.produtos.map((produto) => {
        if (produto.controle.idInterno === action.idInterno) {
          return { ...produto, controle: { ...produto.controle, descricaoStatus: status.enviando } };
        }
        return produto;
      });
      return { ...state, produtos: produtosAtualizados };
    case ENVIAR_PRODUTO_SUCCESS:
      produtosAtualizados = state.produtos.map((produto) => {
        if (produto.controle.idInterno === action.idInterno) {
          return { ...produto, controle: { ...produto.controle, descricaoStatus: status.enviado } };
        }
        return produto;
      });
      return { ...state, produtos: produtosAtualizados };
    case ENVIAR_PRODUTO_FAIL:
      produtosAtualizados = state.produtos.map((produto) => {
        if (produto.controle.idInterno === action.idInterno) {
          return { ...produto, controle: { ...produto.controle, descricaoStatus: status.erro } };
        }
        return produto;
      });
      return { ...state, produtos: produtosAtualizados };
    case DELETE_PRODUTO:
      produtosAtualizados = state.produtos.map((produto) => {
        if (produto.controle.idInterno === action.idInterno) {
          return { ...produto, controle: { ...produto.controle, descricaoStatus: status.naoSeraEnviado, paraEnvio: false } };
        }
        return produto;
      });
      return { ...state, produtos: produtosAtualizados };
    case ADD_PRODUTO:
      produtosAtualizados = state.produtos.map((produto) => {
        if (produto.controle.idInterno === action.idInterno) {
          return {
            ...produto,
            controle: { ...produto.controle, descricaoStatus: status.naoEnviado, paraEnvio: true },
          };
        }
        return produto;
      });
      return { ...state, produtos: produtosAtualizados };
    case ADICIONAR_NOVO_PRODUTO:
      if (state.importarProdutos !== null && state.importarProdutos !== undefined) {
        return { ...state, importarProdutos: state.importarProdutos };
      }
      return { ...state, importarProdutos: [{}] };

    case LOAD_CATEGORIAS_BEGIN:
      return { ...state, categorias: action.payload };
    default:
      return state;
  }
}
