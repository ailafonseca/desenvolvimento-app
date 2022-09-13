import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Container, Button } from 'react-bootstrap'
import { isArrayEmpty } from 'util/utils'

const TelaDeErro = ({ error, callbackReturn, callbackReset, message, dispatch }) => {
  if (error === 'ECONNABORTED' || isArrayEmpty(error)) {
    return (
      <div className='container-success'>
        <div>
          <h1>O Servidor demorou muito a responder.</h1>
          <p>A demora em acessar o servidor poder ser algo momentâneio, por isso, tente novamente.</p>
          <p>Caso o erro persista, entre em contato com o suporte.</p>
          <Button
            className='btn btn-primary saveadd-primary-color'
            onClick={() => {
              dispatch({ type: 'RESETCONNECTION' })
              callbackReturn()
            }}
          >
              Tentar novamente
          </Button>
          <Button
            className='btn btn-primary saveadd-primary-color'
            onClick={() => {
              dispatch({ type: 'RESETCONNECTION' })
              callbackReset && callbackReset()
              callbackReturn()
            }}
          >
              Reiniciar
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Container>
      <h1>{message}</h1>
      {error.map((item, i) => <p key={JSON.stringify(item)}>{i + 1}) {item.campo} - {item.mensagem}</p>)}
      <Button onClick={() => dispatch(callbackReturn())}>Voltar</Button>
    </Container>
  )
}

TelaDeErro.propTypes = {
  error: PropTypes.array,
  callbackReturn: PropTypes.func.isRequired,
  callbackReset: PropTypes.func
}

const mapDispatchToProps = (dispatch) => ({ dispatch })

export default connect(null, mapDispatchToProps)(TelaDeErro)
