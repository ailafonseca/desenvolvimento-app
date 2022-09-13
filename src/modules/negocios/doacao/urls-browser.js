
export default {
  CONTRATO: {
    LISTAR: (tipo) => `/doacao/contrato/listar${tipo === undefined ? '/:tipo' : '/' + tipo}`,
    NOVO: () => '/doacao/contrato/novo',
    EDITAR: (id) => `/doacao/contrato/editar/${id === undefined ? ':id' : id}`
  },
  ANUNCIO: {
    LISTAR: () => '/doacao/anuncio/listar',
    NOVO: (id) => `/doacao/anuncio/novo/${id === undefined ? ':id' : id}`,
    EDITAR: (id) => `/doacao/anuncio/editar/${id === undefined ? ':id' : id}`,
    DIA: () => '/doacao/anuncio/dia'
  },
  RESERVA: {
    LISTAR: () => '/doacao/reserva/listar',
    NOVO: (id) => `/doacao/reserva/novo/${id === undefined ? ':id' : id}`,
    EDITAR: (id) => `/doacao/reserva/editar/${id === undefined ? ':id' : id}`,
    DIA: () => '/doacao/reserva/dia'
  },
  ENTREGA: {
    DONATARIO: {
      LISTAR: () => '/doacao/entrega-donatario/listar',
      NOVO: (id) => `/doacao/entrega-donatario/novo/${id === undefined ? ':id' : id}`,
      EDITAR: (id) => `/doacao/entrega-donatario/editar/${id === undefined ? ':id' : id}`,
      DIA: () => '/doacao/entrega-donatario/dia'
    },
    DOADOR: {
      LISTAR: () => '/doacao/entrega-doador/listar',
      NOVO: (id) => `/doacao/entrega-doador/novo/${id === undefined ? ':id' : id}`,
      EDITAR: (id) => `/doacao/entrega-doador/editar/${id === undefined ? ':id' : id}`,
      DIA: () => '/doacao/entrega-doador/dia'
    }
  }
}
