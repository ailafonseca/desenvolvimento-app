import React from 'react'
import PropTypes from 'prop-types'
import { ListGroup, Col } from 'react-bootstrap'

import { formatCnpjCpf } from 'util/utils'

export default class AssinaturaBox extends React.PureComponent {
    static propTypes = {
      assinaturas: PropTypes.array.isRequired
    };

    render () {
      const { assinaturas } = this.props

      return (
        <Col sm={12} md={6}>
          <strong>Empresas assinantes:</strong>
          <ListGroup variant='flush'>
            {assinaturas.map((assinatura) => (
              <ListGroup.Item
                key={`assinaturas_${assinatura.empresa.idEmpresa}`}
                style={{ padding: '0.10em' }}
              >
                {assinatura.empresa.nomeEmpresa} - {formatCnpjCpf(assinatura.empresa.cnpj)}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      )
    }
}
