import React, { Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Form from './loginForm'

import { submitLogin } from './loginActions'

class Login extends Component {
  render() {
    const { login, history } = this.props

    if (login !== undefined && login.isLogged === true)
      return <h3>Login efetuado com sucesso</h3>

    if (login.message !== undefined && login.message !== '') {
      history.push('/cadastrar')
    }

    return (<Form onSubmit={this.props.submitLogin} />)
  }
}

const mapStateToProps = state => ({ login: state.login })
const mapDispatchToProps = dispatch => bindActionCreators({ submitLogin }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Login)
