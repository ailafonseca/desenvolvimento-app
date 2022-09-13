import React from 'react'
import PropTypes from 'prop-types'

import { isArrayEmpty } from 'util/utils'

export default class FormasDePagamento extends React.PureComponent {
    static propTypes = {
      formasDePagamento: PropTypes.array.isRequired
    };

    renderFormaDePagamento = (item) => (
      <tr key={item.idFormaPagamento}>
        <td className='align-middle'>{item.formaDePagamento.nome}</td>
      </tr>
    )

    render () {
      const { formasDePagamento } = this.props

      if (isArrayEmpty(formasDePagamento)) {
        return <></>
      }

      return (
        <>
          <label>Formas de pagamento cadastradas para esse contrato:</label>
          <table className='table table-hover table-sm'>
            <tbody>
              {formasDePagamento.map((formaDePagamento) => this.renderFormaDePagamento(formaDePagamento))}
            </tbody>
          </table>
        </>
      )
    }
}
