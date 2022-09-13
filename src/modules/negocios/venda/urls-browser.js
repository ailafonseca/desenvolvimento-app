
export default {
  CONTRATO: {
    LISTAR: (tipo) => `/venda/contrato/listar${tipo === undefined ? '/:tipo' : '/' + tipo}`,
    NOVO: () => '/venda/contrato/novo',
    EDITAR: (id) => `/venda/contrato/editar/${id === undefined ? ':id' : id}`
  },
  ANUNCIO: {
    LISTAR: () => '/venda/anuncio/listar',
    NOVO: (id) => `/venda/anuncio/novo/${id === undefined ? ':id' : id}`,
    EDITAR: (id) => `/venda/anuncio/editar/${id === undefined ? ':id' : id}`,
    DIA: () => '/venda/anuncio/dia'
  },
  RESERVA: {
    LISTAR: () => '/venda/reserva/listar',
    NOVO: (id) => `/venda/reserva/novo/${id === undefined ? ':id' : id}`,
    EDITAR: (id) => `/venda/reserva/editar/${id === undefined ? ':id' : id}`,
    DIA: () => '/venda/reserva/dia'
  },
  ENTREGA: {
    COMPRADOR: {
      LISTAR: () => '/venda/entrega-comprador/listar',
      NOVO: (id) => `/venda/entrega-comprador/novo/${id === undefined ? ':id' : id}`,
      EDITAR: (id) => `/venda/entrega-comprador/editar/${id === undefined ? ':id' : id}`,
      DIA: () => '/venda/entrega-comprador/dia'
    },
    ANUNCIANTE: {
      LISTAR: () => '/venda/entrega-anunciante/listar',
      NOVO: (id) => `/venda/entrega-anunciante/novo/${id === undefined ? ':id' : id}`,
      EDITAR: (id) => `/venda/entrega-anunciante/editar/${id === undefined ? ':id' : id}`,
      DIA: () => '/venda/entrega-anunciante/dia'
    }
  }
}
