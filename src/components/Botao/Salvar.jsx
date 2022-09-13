import React from 'react'
import propTypes from 'prop-types'

export default function BotaoSalvar ({ onSalvar, disabled, awaysOnTop }) {
  return (
    <button className='btn btn-success btn-block' onClick={onSalvar} disabled={disabled}>
      Salvar
    </button>
  )
}

BotaoSalvar.propTypes = {
  onSalvar: propTypes.func.isRequired,
  disabled: propTypes.bool,
  awaysOnTop: propTypes.bool
}
