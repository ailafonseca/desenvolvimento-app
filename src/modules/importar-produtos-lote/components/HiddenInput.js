import React, { Component } from 'react'
import './HiddenInput.css'
import { connect } from 'react-redux'
import { clearProducts } from '../actions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

class HiddenInput extends Component {
  render () {
    const { dispatch, clearProducts } = this.props
    return (
      <>
        <input
          type='file'
          id='input'
          accept='application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          style={{
            height: `${0.1}px`,
            width: `${0.1}px`,
            opacity: 0,
            overflow: 'hidden',
            position: 'absolute',
            zIndex: -1
          }}
        />
        <label
          onClick={() => dispatch(clearProducts())}
          id='botaoEnviar'
          htmlFor='input'
          style={{
            cursor: 'pointer',
            backgroundColor: '#00a99d',
            padding: `${15}px`,
            color: 'white',
            fontWeight: 500,
            fontSize: `${1.2}em`
          }}
        >
          <FontAwesomeIcon icon={faUpload} />
          {'  '}Enviar arquivo
        </label>
      </>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({ dispatch, clearProducts })

export default connect(mapDispatchToProps)(HiddenInput)
