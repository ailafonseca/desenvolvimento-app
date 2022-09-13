import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faMapMarked, faMedal, faUser } from '@fortawesome/free-solid-svg-icons'

import URL_VENDA from 'modules/negocios/venda/urls-browser'
import './perfil.css'

export default class VendaPerfilVisualizar extends Component {
  render () {
    return (
      <div className='card margin container'>

        <div className='row-xs-12 row-sm-4 text-center'>
          <FontAwesomeIcon icon={faUser} size='4x' />
        </div>

        <div className='row-xs-12 margin row-sm-4 text-center'>
          <h2>Seu Perfil</h2>
        </div>

        <div className='row divider esconder text-center'>

          <div className='col-sm-4 esconder emphasis'>
            <p>Pontos</p>
            <button className='btn shadow btn-block'><FontAwesomeIcon icon={faMedal} size='sm' /> 200</button>
          </div>

          <div className='col-sm-4 esconder emphasis'>
            <p>Trilhas</p>
            <button className='btn shadow btn-block'><FontAwesomeIcon icon={faMapMarked} size='sm' /> 10 </button>
          </div>

          <div className='col-sm-4 esconder emphasis'>
            <p>Interesses</p>
            <button className='btn shadow btn-block'><FontAwesomeIcon icon={faCheck} size='sm' /> 4 </button>
          </div>
        </div>

        <div className='row-xs-12 row-sm-4 trilhas text-center'>
          <Button href={URL_VENDA.PERFIL_INTERESSES} className='btn saveadd-primary-color btn-block'>Interesses</Button>
        </div>
      </div>
    )
  }
}
