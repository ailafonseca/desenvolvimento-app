import Moment from 'moment'

export const getNow = () => new Date()

/**
 * Date para Date, removendo horário
 * @param {Date} dateTime Data a ter seu horário removido, se vazio = agora.
 */
export const getDate = (dateTime) => {
  if (dateTime === undefined) {
    dateTime = new Date()
  }
  if (typeof dateTime === 'string') {
    dateTime = new Date(dateTime)
  }
  if (!dateTime) {
    return dateTime
  }

  return new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate(), 0, 0, 0, 0)
}

/**
 * Date para Date, removendo horário
 * @param {Date} dateTime Data a ter seu horário removido, se vazio = agora.
 */
export const getDateTime = (dateTime) => {
  if (dateTime === undefined) {
    dateTime = new Date()
  }
  if (typeof dateTime === 'string') {
    dateTime = new Date(dateTime)
  }
  if (!dateTime) {
    return dateTime
  }
  return new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate(), dateTime.getHours(), dateTime.getMinutes(), dateTime.getSeconds(), 0)
}

export const getDateString = (dateTime) => Moment(dateTime).format(Moment.HTML5_FMT.DATE)

/**
 * Transforma um datetime em texto hh:mm
 * @param {Date} dateTime Data para extração do horário, se vazio = agora.
 */
export const getTime = (dateTime) => {
  if (dateTime === undefined) {
    dateTime = new Date()
  }
  return dateTime.getHours() + ':' + dateTime.getMinutes()
}

export const getTimeString = (dateTime) => Moment(dateTime).format(Moment.HTML5_FMT.TIME_SECONDS)

export const joinDateTime = (date, time) => {
  if (typeof date === 'string' && typeof time === 'string') {
    return new Date(date + 'T' + time)
  }
  if (typeof date === 'object' && typeof time === 'string') {
    return new Date(Moment(date).format(Moment.HTML5_FMT.DATE) + 'T' + time)
  }
  if (typeof date === 'string' && typeof time === 'object') {
    return new Date(date + 'T' + Moment(time).format(Moment.HTML5_FMT.TIME))
  }
  if (typeof date === 'object' && typeof time === 'object') {
    return new Date(Moment(date).format(Moment.HTML5_FMT.DATE) + 'T' + Moment(time).format(Moment.HTML5_FMT.TIME))
  }

  return new Date()
}

export const getDateTimeString = (dateTime) => Moment(dateTime).format(Moment.HTML5_FMT.DATETIME_LOCAL)

export const toJsonString = (dateTime) => Moment(dateTime).format(Moment.HTML5_FMT.DATETIME_LOCAL)

export const addMinutes = (datetime, minutes) => Moment(datetime).add(minutes, 'minutes').toDate()
