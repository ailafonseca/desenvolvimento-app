import { getNow, getDate, joinDateTime, toJsonString, getDateTime } from './date'

describe('Funções de data', () => {
  let mockDate
  const currentDate = new Date('2019-05-14T11:01:58')

  beforeAll(() => {
    mockDate = Date
    global.Date = class extends Date {
      constructor () {
        return currentDate
      }
    }
  })

  afterAll(() => {
    global.Date = mockDate
  })

  it('Deve Buscar a data de hoje', () => {
    expect(getNow().toString()).toBe('Tue May 14 2019 11:01:58 GMT-0300 (Brasilia Standard Time)')
  })

  it('Deve converter datetime corretamente', () => {
    expect(getDateTime('Tue May 14 2019 11:01:58 GMT-0300 (GMT-03:00)').toString()).toBe('Tue May 14 2019 11:01:58 GMT-0300 (Brasilia Standard Time)')
  })
  it('deve buscar somente data', () => {
    global.Date = mockDate
    const data = getDate(currentDate)

    expect(data.toString()).toBe('Tue May 14 2019 00:00:00 GMT-0300 (Brasilia Standard Time)')

    expect(data.getDate()).toBeGreaterThan(0)
    expect(data.getMonth()).toBeGreaterThan(0)
    expect(data.getFullYear()).toBeGreaterThan(0)
    expect(data.getHours()).toBe(0)
    expect(data.getMinutes()).toBe(0)
  })

  it('deve juntar duas datas string', () => {
    const data = joinDateTime('2010-03-15', '11:12')

    expect(data.toString()).toBe('Mon Mar 15 2010 11:12:00 GMT-0300 (Brasilia Standard Time)')
  })

  it('deve converter data em string no formato servidor, sem timezone', () => {
    const data = toJsonString(getDateTime('Tue May 14 2019 11:01:58 GMT-0300 (Brasilia Standard Time)'))

    expect(data).toBe('2019-05-14T11:01')
  })
})
