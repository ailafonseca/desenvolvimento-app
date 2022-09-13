import React from 'react'
import PropTypes from 'prop-types'
import { Col } from 'react-bootstrap'
import Switch from 'react-switch'

import Alignment from 'components/Alignment'

const EstoqueSwitch = ({ isEstoque, onChangeEstoque, className }) => (
  <>
    <Col xs={12} md={12} className={className}>
      <Alignment vMiddle hRight as='label'>
            Estoque: Anuncio&nbsp;&nbsp;
        <Switch
          onChange={() => onChangeEstoque(!isEstoque)}
          uncheckedIcon={false}
          checkedIcon={false}
          checked={isEstoque || false}
        />&nbsp;&nbsp;
          Produto
      </Alignment>
    </Col>
  </>
)

EstoqueSwitch.propTypes = {
  className: PropTypes.string,
  isEstoque: PropTypes.bool.isRequired,
  onChangeEstoque: PropTypes.func.isRequired
}

export default EstoqueSwitch
