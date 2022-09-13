import React from 'react'
import PropTypes from 'prop-types'
import { Col } from 'react-bootstrap'
import Switch from 'react-switch'

import Alignment from 'components/Alignment'

const EstoqueSwitchComPreco = ({ isEstoque, isPreco, onChangeEstoque, onChangePreco }) => (
  <>
    <Col xs={12} md={6}>
      <Alignment vMiddle as='label'>
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
    <Col xs={12} md={6}>
      <Alignment vMiddle as='label'>
            Preço: Anuncio&nbsp;&nbsp;
        <Switch
          onChange={() => onChangePreco(!isPreco)}
          uncheckedIcon={false}
          checkedIcon={false}
          checked={isPreco || false}
        />&nbsp;&nbsp;
            Produto
      </Alignment>
    </Col>
  </>
)

EstoqueSwitchComPreco.propTypes = {
  isEstoque: PropTypes.bool.isRequired,
  isPreco: PropTypes.bool.isRequired,
  onChangeEstoque: PropTypes.func.isRequired,
  onChangePreco: PropTypes.func.isRequired
}

export default EstoqueSwitchComPreco
