import { isNullOrEmpty, isArrayEmpty, isNumberPositive, isNumberZeroOrMore, isNumber, getNumberPositiveOrZero } from './utils'

describe('isNullOrEmpty', () => {
  it('Deve ser true para null, undefined ou qualquer string vazia', () => {
    expect(isNullOrEmpty(undefined)).toBe(true)
    expect(isNullOrEmpty(null)).toBe(true)
    expect(isNullOrEmpty('')).toBe(true)
    expect(isNullOrEmpty(' ')).toBe(true)
  })

  it('Deve ser false para qualquer texto ou numero', () => {
    expect(isNullOrEmpty(' texto ')).toBe(false)
    expect(isNullOrEmpty(0)).toBe(false)
  })
})

describe('isArrayEmpty', () => {
  it('Deve retornar true para null, undefined ou vazio', () => {
    expect(isArrayEmpty(null)).toBe(true)
    expect(isArrayEmpty(undefined)).toBe(true)
    expect(isArrayEmpty([])).toBe(true)
  })

  it('Deve ser falso para array com 1 ou mais itens', () => {
    expect(isArrayEmpty([1])).toBe(false)
    expect(isArrayEmpty([1, 2])).toBe(false)
  })
})

describe('isNumberPositive', () => {
  it('Deve ser true para números positivos', () => {
    expect(isNumberPositive(1)).toBe(true)
    expect(isNumberPositive(5)).toBe(true)
    expect(isNumberPositive(1892)).toBe(true)
  })

  it('Deve ser false para qualquer situação de não número positivo', () => {
    expect(isNumberPositive(undefined)).toBe(false)
    expect(isNumberPositive(null)).toBe(false)
    expect(isNumberPositive(0)).toBe(false)
    expect(isNumberPositive(-5)).toBe(false)
    expect(isNumberPositive('5')).toBe(false)
    expect(isNumberPositive({ abobora: 5 })).toBe(false)
  })
})

describe('isNumberZeroOrMore', () => {
  it('Deve ser true para números n => 0', () => {
    expect(isNumberZeroOrMore(1)).toBe(true)
    expect(isNumberZeroOrMore(5)).toBe(true)
    expect(isNumberZeroOrMore(0)).toBe(true)
  })

  it('Deve ser false para qualquer situação de não número diferente de n >= 0', () => {
    expect(isNumberZeroOrMore(undefined)).toBe(false)
    expect(isNumberZeroOrMore(null)).toBe(false)
    expect(isNumberZeroOrMore(-5)).toBe(false)
    expect(isNumberZeroOrMore({ abobora: 5 })).toBe(false)
    expect(isNumberZeroOrMore('0')).toBe(false)
  })
})

describe('isNumberZeroOrMore', () => {
  it('Deve ser true para números n => 0', () => {
    expect(isNumber(1)).toBe(true)
    expect(isNumber(5)).toBe(true)
    expect(isNumber(0)).toBe(true)
    expect(isNumber(-5)).toBe(true)
  })

  it('Deve ser false para qualquer situação de não número diferente de n >= 0', () => {
    expect(isNumber(undefined)).toBe(false)
    expect(isNumber(null)).toBe(false)
    expect(isNumber('5')).toBe(false)
    expect(isNumber({ abobora: 5 })).toBe(false)
  })
})

describe('getNumberPositiveOrZero', () => {
  it('Deve ser 0 se não for número', () => {
    expect(getNumberPositiveOrZero(1)).toBe(1)
    expect(getNumberPositiveOrZero('5')).toBe(5)
    expect(getNumberPositiveOrZero(3.1)).toBe(3.1)
    expect(getNumberPositiveOrZero('4.1')).toBe(4.1)
    expect(getNumberPositiveOrZero(-5)).toBe(-5)
  })

  it('Não deve receber o valor se não for número', () => {
    expect(getNumberPositiveOrZero(undefined)).toBe(0)
    expect(getNumberPositiveOrZero(null)).toBe(0)
    expect(getNumberPositiveOrZero('4quatro')).toBe(0)
    expect(getNumberPositiveOrZero({ abobora: 5 })).toBe(0)
  })
})
