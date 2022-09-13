import React from 'react'
import PropTypes from 'prop-types'
import { ListGroup, Col } from 'react-bootstrap'

export default class GruposBox extends React.PureComponent {
    static propTypes = {
      grupos: PropTypes.array.isRequired
    };

    renderGrupo = (grupo) => (
      <tr key={grupo.id || grupo.idGrupo}>
        <td className='align-middle'>Grupo: {grupo.grupo.nome}</td>
      </tr>
    )

    render () {
      const { grupos } = this.props

      return (
        <Col sm={12} md={6}>
          <strong>Grupos assinantes:</strong>
          <ListGroup variant='flush'>
            {grupos.map((grupo) => (
              <ListGroup.Item
                key={`assinaturas_${grupo.idGrupo}`}
                style={{ padding: '0.10em' }}
              >
                {grupo.grupo.nome}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      )
    }
}
