import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import { Widget } from '@typeform/embed-react'
import { Screen } from 'components/style'

import { screenSize } from 'util/utils'
import './style.css'
class TrailForms extends Component {
  constructor(props) {
    super(props)

    const form_id = this.props.match.params.id

    this.state = {
      form_id,
      screenSize: 'md',
    }
  }

  componentDidMount() {
    this.setState({ screenSize: screenSize() })

    window.addEventListener('resize', () => {
      this.setState({ screenSize: screenSize() })
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => {})
  }

  get hiddenValues() {
    const values = {
      idform: this.state.form_id,
      nome: this.props.login.nomeUsuario,
      cpf: this.props.login.nomeUsuario,
    }

    return values
  }

  onSubmit(data) {
    console.log('SUBMITED', data)
  }

  endClick(data) {
    console.log('END', data)
  }

  render() {
    if (!this.state.form_id) return <Redirect to="/perfil" />

    return (
      <Screen back={{ to: '/perfil', title: 'Perfil' }}>
        <Widget hidden={this.hiddenValues} id={this.state.form_id} className="profile-typeform" onEndingButtonClick={this.endClick} onSubmit={this.onSubmit} />
      </Screen>
    )
  }
}

const mapStateToProps = (state) => ({
  login: state.login,
  perfil: state.perfil,
})
const mapDispatchToProps = (dispatch) => ({
  dispatch,
})
export default connect(mapStateToProps, mapDispatchToProps)(TrailForms)
