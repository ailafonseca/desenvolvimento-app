import { getDate, getNow } from 'util/date'
import lod from 'lodash'

const isDataValid = (data) => !data || getDate(data) >= getDate()
const isHoraValid = (hora) => hora && hora >= getNow()
const isInicioFimDateValid = (inicio, fim) => !inicio || !fim || (getDate(inicio) >= getDate() && getDate(fim) >= getDate(inicio))
const isInicioFimHoraValid = (inicio, fim) => inicio && fim && (fim >= inicio)

export const isReservaDataInicioValid = (anuncio) => (
  isDataValid(anuncio.dataInicioReserva) &&
  isHoraValid(anuncio.dataInicioReserva)
)

export const isReservaDataFimValid = (anuncio) => (
  isDataValid(anuncio.dataFimReserva) &&
    isInicioFimDateValid(anuncio.dataInicioReserva, anuncio.dataFimReserva) &&
    isInicioFimHoraValid(anuncio.dataInicioReserva, anuncio.dataFimReserva)
)

export const isEntregaDataInicioValid = (anuncio) => (
  isDataValid(anuncio.dataInicioEntrega) &&
  isInicioFimDateValid(anuncio.dataInicioReserva, anuncio.dataInicioEntrega) &&
  isHoraValid(anuncio.dataInicioEntrega)
)

export const isEntregaDataFimValid = (anuncio) => (
  isDataValid(anuncio.dataFimEntrega) &&
    isInicioFimDateValid(anuncio.dataInicioEntrega, anuncio.dataFimEntrega) &&
    isInicioFimDateValid(anuncio.dataFimReserva, anuncio.dataFimEntrega) &&
    isInicioFimHoraValid(anuncio.dataInicioEntrega, anuncio.dataFimEntrega) &&
    isInicioFimHoraValid(anuncio.dataFimReserva, anuncio.dataFimEntrega)
)
export const isFormValid = (anuncio, original) => {
  const anuncioRaw = { ...anuncio, anuncioProdutosRemovidos: null }
  return (
    !lod.isEqual(original, anuncioRaw) &&
    isReservaDataInicioValid(anuncio) &&
    isEntregaDataInicioValid(anuncio) &&
    isReservaDataFimValid(anuncio) &&
    isEntregaDataFimValid(anuncio) &&
    (anuncio.anuncioProdutos.some(ap => ap.quantidade > 0) || anuncio.isEstoqueProduto)
  )
}
