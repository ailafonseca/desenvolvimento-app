import React from 'react'

const BotaoSalvar = (props) => (
  <button className='btn btn-success btn-block' style={props.style} onClick={props.onClick} disabled={props.disabled}>
    {props.text === undefined ? 'Salvar' : props.text}
  </button>
)

export default BotaoSalvar
