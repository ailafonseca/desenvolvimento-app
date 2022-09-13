
export default {
  ENTREGA: {
    DONATARIO: {
      LOAD: {
        ALL: {
          BEGIN: 'DOACAO_ENTREGA_DONATARIO_LOAD_ALL_BEGIN',
          SUCCESS: 'DOACAO_ENTREGA_DONATARIO_LOAD_ALL_SUCCESS',
          FAILURE: 'DOACAO_ENTREGA_DONATARIO_LOAD_ALL_FAILURE'
        }
      },
      ATIVAR: {
        BEGIN: 'DOACAO_ENTREGA_DONATARIO_ATIVAR_BEGIN',
        SUCCESS: 'DOACAO_ENTREGA_DONATARIO_ATIVAR_SUCCESS',
        FAILURE: 'DOACAO_ENTREGA_DONATARIO_ATIVAR_FAILURE'
      },
      DESATIVAR: {
        BEGIN: 'DOACAO_ENTREGA_DONATARIO_DESATIVAR_BEGIN',
        SUCCESS: 'DOACAO_ENTREGA_DONATARIO_DESATIVAR_SUCCESS',
        FAILURE: 'DOACAO_ENTREGA_DONATARIO_DESATIVAR_FAILURE'
      },
      POST: {
        BEGIN: 'DOACAO_ENTREGA_DONATARIO_POST_BEGIN',
        SUCCESS: 'DOACAO_ENTREGA_DONATARIO_POST_SUCCESS',
        FAILURE: 'DOACAO_ENTREGA_DONATARIO_POST_FAILURE'
      },
      UPDATE: {
        BEGIN: 'DOACAO_ENTREGA_DONATARIO_PUT_BEGIN',
        SUCCESS: 'DOACAO_ENTREGA_DONATARIO_PUT_SUCCESS',
        FAILURE: 'DOACAO_ENTREGA_DONATARIO_PUT_FAILURE'
      },
      BYID: {
        BEGIN: 'DOACAO_ENTREGA_DONATARIO_BYID_BEGIN',
        SUCCESS: 'DOACAO_ENTREGA_DONATARIO_BYID_SUCCESS',
        FAILURE: 'DOACAO_ENTREGA_DONATARIO_BYID_FAILURE'
      },
      CLEARERROR: 'DOACAO_ENTREGA_DONATARIO_CLEAR_ERROR',
      CLEARSUCCESS: 'DOACAO_ENTREGA_DONATARIO_CLEAR_SUCCESS',
      SEMRESERVA: 'DOACAO_ENTREGA_DONATARIO_NAO_HAVERA_RESERVA'
    }
  }
}