import React, { Component } from 'react'
import Interesse from 'components/interesse'
import URL_VENDA from 'modules/negocios/venda/urls-browser'

export default class VendaPerfilInteresses extends Component {
  render () {
    return (
      <div className='container'>
        <div className='margin'>
          <h3>Interesses</h3>
        </div>

        <Interesse
          imagem={require('./imgs/interesse_alimentacao.jpg')}
          titulo='Serviços de Alimentação'
          descricao='Linha de interesses destinada a empresas que fabricam alimentos e restaurantes que fazem o processamento interno de produtos que não fazem parte dos padrões comerciais do fornecedor.'
          urlBotao={URL_VENDA.PERFIL_TRILHAS}
          classNameBotao='btn btn-block saveadd-primary-color'
        />
      </div>
    )
  }
}
