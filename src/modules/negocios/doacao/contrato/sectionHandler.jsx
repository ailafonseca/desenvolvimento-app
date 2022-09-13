import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

export default class SectionHandler extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      etapas: props.etapas,
      etapaAtiva: props.etapaInicial,
      finalizar: props.finalizar
    }
  }

  displayEtapa (i) {
    const { etapas } = this.state

    if (Array.isArray(etapas)) {
      const etapa = etapas.find((e) => e.etapa === i)

      if (etapa && etapa.callback && typeof etapa.callback === 'function') {
        return (
          <div className='container-with-fixedbottom marginFooter'>
            {etapa.callback()}
          </div>
        )
      }
    }

    return <></>
  }

  getEtapa (i) {
    const { etapas } = this.state

    if (Array.isArray(etapas)) {
      const etapa = etapas.find((e) => e.etapa === i)

      if (etapa !== null && etapa !== undefined) {
        return etapa
      }
    }

    return null
  }

  setEtapa (i) {
    this.setState({ etapaAtiva: i })
  }

  exibirBotaoEtapa (i) {
    const etapa = this.getEtapa(i)

    if (etapa && typeof etapa.hasErrorCallback === 'function' && etapa.hasErrorCallback() === true) {
      return (
        <button
          className='button-circleRed'
          test='warning'
          key={`sectionHandler_${i}`}
          etapa={i}
          ativa={i === this.state.etapaAtiva ? 'true' : 'false'}
          onClick={() => this.setEtapa(i)}
        >
          {i}
        </button>
      )
    } else {
      return (
        <button className='button-circle' key={`sectionHandler_${i}`} etapa={i} ativa={i === this.state.etapaAtiva ? 'true' : 'false'} onClick={() => this.setEtapa(i)}>
          {i}
        </button>
      )
    }
  }

  previousButton () {
    return (
      <Button test='previous' variant='secondary' onClick={() => this.setEtapa(this.state.etapaAtiva - 1)}>
        Anterior
      </Button>
    )
  }

  nextButton () {
    return (
      <Button test='next' variant='primary' onClick={() => this.setEtapa(this.state.etapaAtiva + 1)}>
        Próximo
      </Button>
    )
  }

  saveButton () {
    const etapaWithError = this.state.etapas.some((e) => typeof e.hasErrorCallback === 'function' && e.hasErrorCallback())
    const disabled = etapaWithError || (this.state.hasErrorCallback === 'function' && this.state.hasErrorCallback())

    return (
      <button test='save' className='btn btn-success' onClick={() => this.state.finalizar()} disabled={disabled}>
        Salvar
      </button>
    )
  }

  isNotPrimeiraEtapa () {
    return this.state.etapaAtiva !== 1
  }

  isNotUltimaEtapa () {
    return this.state.etapaAtiva !== this.state.etapas.length
  }

  isUltimaEtapa () {
    return this.state.etapaAtiva === this.state.etapas.length
  }

  render () {
    const { etapas, etapaAtiva } = this.state

    return (
      <div>
        <div className='botoes margin'>{Array.isArray(etapas) && etapas.map((e) => this.exibirBotaoEtapa(e.etapa))}</div>
        <div className='card container'>
          {etapaAtiva && this.displayEtapa(etapaAtiva)}
          <div className={`row justify-content-end container-actions ${this.props.isInViewport ? 'container-actions-absolute' : 'container-actions-absolute'}`}>
            {this.isNotPrimeiraEtapa() && this.previousButton()}
            {this.isNotUltimaEtapa() && this.nextButton()}
            {this.isUltimaEtapa() && this.saveButton()}
          </div>
        </div>
      </div>
    )
  }
}

SectionHandler.propTypes = {
  etapas: PropTypes.arrayOf(
    PropTypes.shape({
      etapa: PropTypes.number.isRequired,
      callback: PropTypes.func.isRequired,
      ativa: PropTypes.bool
    })
  ).isRequired,
  hasErrorCallback: PropTypes.bool,
  etapaInicial: PropTypes.number,
  finalizar: PropTypes.func
}
