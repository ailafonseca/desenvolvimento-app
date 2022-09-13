import React from 'react'

const BotaoCancelar = (props) => (
  <button className='btn btn-danger btn-block' onClick={props.onClick} disabled={props.disabled}>
    <span>{props.label}</span>
  </button>
)

export default BotaoCancelar
