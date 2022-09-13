import Moment from 'moment'

export const DisplayStringLimit = (str, max = 30) => (str !== undefined && str.length > max ? `${str.substring(0, max)}...` : str)

export const DisplayString = (str) => (str !== undefined && str.length > 0 ? str : '-')

export const DateInput = (date) => Moment(date).utc(-3).format('YYYY-MM-DD')

export const DateDDMM = (date) => Moment(date).utc(-3).format('DD/MM')

export const DisplayData = (data) => {
  if (data === null || data === undefined) return '-'

  const dateMoment = new Moment(data)
  return dateMoment.year() > 5 ? dateMoment.utc(-3).format('DD/MM/YYYY') : ''
}

export const DisplayHoraMim = (data) => {
  if (data === null || data === undefined) return '-'

  const dateMoment = new Moment(data)
  return dateMoment.year() > 5 ? dateMoment.utc(-3).format('HH:mm') : ''
}

export const dateDayMonth = (data) => {
  let splitter = []
  splitter.push(data.split('/'))
  splitter = splitter[0]
  splitter.pop()
  splitter = splitter.join('/')
  return splitter
}

export const displayHorario = (inicio, fim) => {
  if (inicio !== undefined && inicio !== null && fim !== undefined && fim !== null) {
    return `${inicio.substring(0, 5)}-${fim.substring(0, 5)}`
  }
  return '-'
}

export const DateTimeFormat = (date) => {
  if (date === null || date === undefined || date === '0001-01-01T00:00:00') {
    return null
  }

  return new Date(date).toLocaleString('pt-BR')
}

export const DateTimeFormatOrDash = (date) => {
  const ret = DateTimeFormat(date)
  if (ret === null) {
    return '-'
  }

  return ret
}
