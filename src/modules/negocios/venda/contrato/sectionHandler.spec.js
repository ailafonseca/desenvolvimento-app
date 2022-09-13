import React from 'react'
import { mount } from 'enzyme'

import SectionHandler from './sectionHandler'

const setUp = (props = {}) => {
  return mount(<SectionHandler hasErrorCallback={jest.fn(() => false)} {...props} />)
}

const getEtapas = (i) => {
  return [...Array(i)].map((empty, i) => {
    return { etapa: i + 1, callback: emptyElementCallback, hasErrorCallback: emptyElementHasErrorCallback }
  })
}

const emptyElementCallback = jest.fn(() => <></>)
const emptyElementHasErrorCallback = jest.fn(() => false)

describe('Testando controlador de section (SectionHandler)', () => {
  it('Deve criar todas as etapas que foram informadas por parametro', () => {
    const comp1 = setUp({
      etapas: getEtapas(5)
    })

    expect(comp1.find({ etapa: 1 }).length).toBe(1)
    expect(comp1.find({ etapa: 2 }).length).toBe(1)
    expect(comp1.find({ etapa: 3 }).length).toBe(1)
    expect(comp1.find({ etapa: 4 }).length).toBe(1)
    expect(comp1.find({ etapa: 5 }).length).toBe(1)

    const comp2 = setUp({
      etapas: getEtapas(3)
    })
    expect(comp2.find({ etapa: 1 }).length).toBe(1)
    expect(comp2.find({ etapa: 2 }).length).toBe(1)
    expect(comp2.find({ etapa: 3 }).length).toBe(1)
    expect(comp2.find({ etapa: 4 }).length).toBe(0)
    expect(comp2.find({ etapa: 5 }).length).toBe(0)

    const comp3 = setUp({ etapas: getEtapas(10) })
    for (let i = 1; i <= 10; i++) {
      expect(comp3.find({ etapa: i }).length).toBe(1)
    }
  })

  it('Deve carreagar todas as etapas como inativas se não for definido EtapaInicial', () => {
    const comp1 = setUp({
      etapas: getEtapas(5)
    })

    for (let i = 1; i <= 5; i++) {
      expect(comp1.find({ etapa: i, ativa: 'false' }).length).toBe(1)
    }
  })

  it('Deve iniciar com etapa do parametro selecionada selecionada', () => {
    const comp1 = setUp({ etapas: getEtapas(10), etapaInicial: 8 })

    for (let i = 1; i < 10; i++) {
      expect(comp1.find({ etapa: i }).length).toBe(1)
    }

    expect(comp1.find({ etapa: 8, ativa: 'true' }).length).toBe(1)
  })

  it('Deve mudar selecionar etapa clicada', () => {
    const comp1 = setUp({ etapas: getEtapas(10), etapaInicial: 1 })

    expect(comp1.find({ etapa: 1, ativa: 'true' }).length).toBe(1)

    comp1.find({ etapa: 5 }).simulate('click')

    expect(comp1.find({ etapa: 1, ativa: 'false' }).length).toBe(1)
    expect(comp1.find({ etapa: 5, ativa: 'true' }).length).toBe(1)
  })

  it('Deve chamar a exibição da seção 1 somente se for passado parametro de página inicial', () => {
    const expectedCallback = () => <span className='elementTestCallback' />

    const comp1 = setUp({
      etapas: [{ etapa: 1, callback: expectedCallback, hasErrorCallback: emptyElementHasErrorCallback }]
    })

    expect(comp1.find('.elementTestCallback').length).toBe(0)

    const comp2 = setUp({
      etapas: [{ etapa: 1, callback: expectedCallback, hasErrorCallback: emptyElementHasErrorCallback }],
      etapaInicial: 1
    })

    expect(comp2.find('.elementTestCallback').length).toBe(1)
  })

  it('Deve chamar a exibição da seção 3 após clique', () => {
    const expectedCallback = () => <span className='elementTestCallback' />

    const comp1 = setUp({
      etapas: [
        { etapa: 1, callback: emptyElementCallback, hasErrorCallback: emptyElementHasErrorCallback },
        { etapa: 2, callback: emptyElementCallback, hasErrorCallback: emptyElementHasErrorCallback },
        { etapa: 3, callback: expectedCallback, hasErrorCallback: emptyElementHasErrorCallback },
        { etapa: 4, callback: emptyElementCallback, hasErrorCallback: emptyElementHasErrorCallback }
      ]
    })

    expect(comp1.find('.elementTestCallback').length).toBe(0)
    comp1.find({ etapa: 3 }).simulate('click')
    expect(comp1.find('.elementTestCallback').length).toBe(1)
  })

  it('Deve navegar para frente', () => {
    const paginaEtapa1 = () => <span className='etapa1TestCallback' />
    const paginaEtapa2 = () => <span className='etapa2TestCallback' />
    const paginaEtapa3 = () => <span className='etapa3TestCallback' />

    const comp1 = setUp({
      etapas: [
        { etapa: 1, callback: paginaEtapa1, hasErrorCallback: emptyElementHasErrorCallback },
        { etapa: 2, callback: paginaEtapa2, hasErrorCallback: emptyElementHasErrorCallback },
        { etapa: 3, callback: paginaEtapa3, hasErrorCallback: emptyElementHasErrorCallback }
      ],
      etapaInicial: 1,
      hasErrorCallback: jest.fn(() => true)
    })

    expect(comp1.find('.etapa1TestCallback').length).toBe(1)
    expect(comp1.find('.etapa2TestCallback').length).toBe(0)
    expect(comp1.find('.etapa3TestCallback').length).toBe(0)

    expect(comp1.find({ test: 'next' }).length).toBe(2)
    comp1.find({ test: 'next' }).at(0).simulate('click')

    expect(comp1.find('.etapa1TestCallback').length).toBe(0)
    expect(comp1.find('.etapa2TestCallback').length).toBe(1)
    expect(comp1.find('.etapa3TestCallback').length).toBe(0)
  })

  it('Deve navegar para trás', () => {
    const paginaEtapa1 = () => <span className='etapa1TestCallback' />
    const paginaEtapa2 = () => <span className='etapa2TestCallback' />
    const paginaEtapa3 = () => <span className='etapa3TestCallback' />

    const comp1 = setUp({
      etapas: [
        { etapa: 1, callback: paginaEtapa1, hasErrorCallback: emptyElementHasErrorCallback },
        { etapa: 2, callback: paginaEtapa2, hasErrorCallback: emptyElementHasErrorCallback },
        { etapa: 3, callback: paginaEtapa3, hasErrorCallback: emptyElementHasErrorCallback }
      ],
      etapaInicial: 2,
      hasErrorCallback: jest.fn(() => true)
    })

    expect(comp1.find('.etapa1TestCallback').length).toBe(0)
    expect(comp1.find('.etapa2TestCallback').length).toBe(1)
    expect(comp1.find('.etapa3TestCallback').length).toBe(0)

    expect(comp1.find({ test: 'previous' }).length).toBe(2)
    comp1.find({ test: 'previous' }).at(0).simulate('click')

    expect(comp1.find('.etapa1TestCallback').length).toBe(1)
    expect(comp1.find('.etapa2TestCallback').length).toBe(0)
    expect(comp1.find('.etapa3TestCallback').length).toBe(0)
  })

  it('Não deve ter disponível navegação para trás na primeira etapa', () => {
    const paginaEtapa1 = () => <span className='etapa1TestCallback' />
    const comp1 = setUp({
      etapas: [{ etapa: 1, callback: paginaEtapa1, hasErrorCallback: emptyElementHasErrorCallback }],
      etapaInicial: 1,
      hasErrorCallback: jest.fn(() => true)
    })

    expect(comp1.find({ test: 'previous' }).length).toBe(0)
  })

  it('Não deve ter disponível navegação para frente na última etapa', () => {
    const paginaEtapa1 = () => <span className='etapa1TestCallback' />
    const paginaEtapa2 = () => <span className='etapa2TestCallback' />
    const paginaEtapa3 = () => <span className='etapa3TestCallback' />
    const comp1 = setUp({
      etapas: [
        { etapa: 1, callback: paginaEtapa1, hasErrorCallback: emptyElementHasErrorCallback },
        { etapa: 2, callback: paginaEtapa2, hasErrorCallback: emptyElementHasErrorCallback }
      ],
      etapaInicial: 2,
      hasErrorCallback: jest.fn(() => true)
    })

    expect(comp1.find({ test: 'next' }).length).toBe(0)

    const comp2 = setUp({
      etapas: [
        { etapa: 1, callback: paginaEtapa1, hasErrorCallback: emptyElementHasErrorCallback },
        { etapa: 2, callback: paginaEtapa2, hasErrorCallback: emptyElementHasErrorCallback },
        { etapa: 3, callback: paginaEtapa3, hasErrorCallback: emptyElementHasErrorCallback }
      ],
      etapaInicial: 3,
      hasErrorCallback: jest.fn(() => true)
    })

    expect(comp2.find({ test: 'next' }).length).toBe(0)
  })

  it('Deve disponibilizar um botão de salvar na ultima etapa', () => {
    const paginaEtapa1 = () => <span className='etapa1TestCallback' />
    const paginaEtapa2 = () => <span className='etapa2TestCallback' />
    const paginaEtapa3 = () => <span className='etapa3TestCallback' />

    const comp1 = setUp({
      etapas: [
        { etapa: 1, callback: paginaEtapa1, hasErrorCallback: emptyElementHasErrorCallback },
        { etapa: 2, callback: paginaEtapa2, hasErrorCallback: emptyElementHasErrorCallback },
        { etapa: 3, callback: paginaEtapa3, hasErrorCallback: emptyElementHasErrorCallback }
      ],
      etapaInicial: 1,
      hasErrorCallback: jest.fn(() => true)
    })

    expect(comp1.find({ test: 'save' }).length).toBe(0)

    expect(comp1.find({ test: 'next' }).length).toBe(2)
    comp1.find({ test: 'next' }).at(0).simulate('click')

    expect(comp1.find({ test: 'save' }).length).toBe(0)

    expect(comp1.find({ test: 'next' }).length).toBe(2)
    comp1.find({ test: 'next' }).at(0).simulate('click')

    expect(comp1.find({ test: 'save', disabled: false }).length).toBe(1)
  })

  it('Deve ter o botão de salvar inativo caso tenha algum erro', () => {
    const mockHasErrorCallback = jest.fn(() => true)
    const comp1 = setUp({
      etapas: [
        { etapa: 1, callback: emptyElementCallback, hasErrorCallback: emptyElementHasErrorCallback },
        { etapa: 2, callback: emptyElementCallback, hasErrorCallback: () => true },
        { etapa: 3, callback: emptyElementCallback, hasErrorCallback: emptyElementHasErrorCallback }
      ],
      etapaInicial: 3,
      hasErrorCallback: mockHasErrorCallback
    })
    expect(comp1.find({ test: 'save', disabled: true }).length).toBe(1)
  })

  it('Deve exibir botao de warning ao inves da etapa, caso tenha algum erro na etapa', () => {
    const comp1 = setUp({
      etapas: [
        { etapa: 1, callback: emptyElementCallback, hasErrorCallback: emptyElementHasErrorCallback },
        { etapa: 2, callback: emptyElementCallback, hasErrorCallback: () => true },
        { etapa: 3, callback: emptyElementCallback, hasErrorCallback: emptyElementHasErrorCallback }
      ],
      etapaInicial: 3
    })
    // console.log("Debug no enzyme", comp1.debug());
    expect(comp1.find({ etapa: 2, test: 'warning' }).length).toBe(1)
  })
})
