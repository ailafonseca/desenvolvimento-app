import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Card, Container } from 'react-bootstrap'

import { InputComponent } from 'util/formTypes'
import { getDateTimeString, getDateTime } from 'util/date'

export default function HorarioBox ({ disabled, inicio, fim, onChangeInicio, onChangeFim, titulo, invalidInicio, invalidFim }) {
  const [dtInicio, setInicio] = useState(getDateTimeString(inicio))
  const [dtFim, setFim] = useState(getDateTimeString(fim))

  useEffect(() => {
    if (inicio) {
      setInicio(getDateTimeString(inicio))
    }
    if (fim) {
      setFim(getDateTimeString(fim))
    }
  }, [inicio, fim])

  return (
    <Card>
      <Card.Header>
        {titulo}
      </Card.Header>
      <Card.Body>
        <Container>
          <Row>
            <Col xs={12} md={6}>
              <label>Inicia em:</label>
            </Col>
            <Col xs={12} md={6}>
              <InputComponent
                type='datetime-local'
                invalid={invalidInicio}
                disabled={disabled}
                onChange={(value) => {
                  if (value) {
                    setInicio(value)
                    if (onChangeInicio) {
                      onChangeInicio(getDateTime(value))
                    }
                  }
                }}
                value={dtInicio}
              />
            </Col>
            <Col xs={12} md={6}>
              <label>Encerra em:</label>
            </Col>
            <Col xs={12} md={6}>
              <InputComponent
                type='datetime-local'
                invalid={invalidFim}
                disabled={disabled}
                onChange={(value) => {
                  if (value) {
                    setFim(value)
                    if (onChangeFim) {
                      onChangeFim(getDateTime(value))
                    }
                  }
                }}
                value={dtFim}
              />
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  )
}

HorarioBox.propTypes = {
  disabled: PropTypes.bool,
  inicio: PropTypes.instanceOf(Date),
  fim: PropTypes.instanceOf(Date),
  onChangeInicio: PropTypes.func.isRequired,
  onChangeFim: PropTypes.func.isRequired,
  titulo: PropTypes.string.isRequired,
  invalidInicio: PropTypes.bool,
  invalidFim: PropTypes.bool
}
