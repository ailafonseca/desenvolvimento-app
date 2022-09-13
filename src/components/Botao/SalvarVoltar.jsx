import React from 'react'
import propTypes from 'prop-types'

export default function BotaoSalvarEVoltar ({ onVoltar, onSalvar, disabledVoltar, disabledSalvar, alwaysOnTop }) {
  return (
    <div
      className='btn-group inline-block'
      role='group'
      style={{ display: 'block', width: '100%' }}
    >
      <button
        className='btn btn-secondary inline-block'
        style={{ display: 'inline', width: '49%' }}
        onClick={onVoltar}
        disabled={disabledVoltar}
      >
        Voltar
      </button>
      <button
        className='btn btn-success inline-block'
        style={{ display: 'inline', width: '49%' }}
        onClick={onSalvar}
        disabled={disabledSalvar}
      >
        Salvar
      </button>
    </div>
  )
}

BotaoSalvarEVoltar.propTypes = {
  onSalvar: propTypes.func.isRequired,
  onVoltar: propTypes.func.isRequired,
  disabledVoltar: propTypes.bool,
  disabledSalvar: propTypes.bool,
  awaysOnTop: propTypes.bool
}
