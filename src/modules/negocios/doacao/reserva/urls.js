import { API_BASE } from 'settings'

export default {
  API: {
    LOAD: {
      ALL: () => `${API_BASE}/negocio/doacao/anuncio/assinante/reserva`,
      BYID: (idReservaInteracao) => `${API_BASE}/negocio/doacao/reserva/${idReservaInteracao}`
    },
    POST: () => `${API_BASE}/negocio/doacao/reserva/cliente`,
    PUT: (id) => `${API_BASE}/negocio/doacao/reserva/${id}`,
    SEMRESERVA: () => '',
    CLIENTE: () => `${API_BASE}/negocio/doacao/reserva/cliente`,
    DAILY: () => `${API_BASE}/negocio/doacao/reserva/getdailyid`
  }
}
