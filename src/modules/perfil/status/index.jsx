import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'

import { Container, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faQuestion, faTimes } from '@fortawesome/free-solid-svg-icons'

import { trails } from '../trails'
import { screenSize } from 'util/utils'

import { Screen } from 'components/style'

import './style.css'

const StatusSucesso = () => (
  <div className="card-body py-2">
    <h4 className="card-title text-center">Ótimo, foi finalizado o formulário com sucesso</h4>
    <h6 className="card-caption text-center">Iremos analisar sua resposta e você terá acesso as oportunidades para o seu perfil</h6>
    <div className="py-5 d-flex align-items-center justify-content-center">
      <div className="status-icon rounded-circle bg-success">
        <FontAwesomeIcon icon={faCheck} size="lg" />
      </div>
    </div>
  </div>
)

const StatusIncompleto = () => (
  <div className="card-body py-2">
    <h4 className="card-title text-center">Seu formulario está incompleto</h4>
    <h6 className="card-caption text-center">Clique em repetir e responda o formalurio novamente.</h6>
    <div className="py-5 d-flex align-items-center justify-content-center">
      <div className="status-icon rounded-circle bg-warning">
        <FontAwesomeIcon icon={faQuestion} size="lg" />
      </div>
    </div>
  </div>
)

const StatusErro = () => (
  <div className="card-body py-2">
    <h4 className="card-title text-center">Infelizmente, você ainda não pode ser validado</h4>
    <h6 className="card-caption text-center">Suas respostas não estão adequadas para validar o seu acesso. Fale conosco para saber como conseguir ou tente novamente.</h6>
    <div className="py-5 d-flex align-items-center justify-content-center">
      <div className="status-icon rounded-circle bg-danger">
        <FontAwesomeIcon icon={faTimes} size="lg" />
      </div>
    </div>
  </div>
)

const ButtonBack = ({ block }) => (
  <Button block={block} variant="outline-primary" href="/perfil">
    VOLTAR
  </Button>
)

const ButtonRetry = ({ block, url }) => (
  <Button variant="primary" block={block} href={url}>
    REPETIR
  </Button>
)

class Status extends Component {
  constructor(props) {
    super(props)

    const status = this.props.match.params.status

    this.state = {
      status,
      screenSize: 'md',
    }
  }

  getSearchParams() {
    return new URLSearchParams(this.props.location.search)
  }

  get trailUrl() {
    const params = this.getSearchParams()

    const items = Object.keys(trails).reduce((total, current) => {
      return [...total, ...trails[current]]
    }, [])
    const trail = items.filter((el) => el.idform === params.get('idform'))[0]

    if (!trail) return '/perfil'
    return `${trail.url}#idform=${trail.idform}&nome=${this.props.login.nomeUsuario}&cpf=${this.props.login.nomeUsuario}`
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

  render() {
    if (this.state.status === 'sucesso')
      return (
        <Screen middle>
          <Container>
            <StatusSucesso />
            <div className="py-3 d-flex justify-content-center ">
              <ButtonBack block={this.state.screenSize !== 'lg'} />
            </div>
          </Container>
        </Screen>
      )
    else if (this.state.status === 'incompleto')
      return (
        <Screen middle>
          <Container>
            <StatusIncompleto />
            <div className={`py-3 d-flex justify-content-center${this.state.screenSize !== 'lg' ? ' flex-column' : ''}`}>
              <ButtonRetry block={this.state.screenSize !== 'lg'} url={this.trailUrl} />
              <ButtonBack block={this.state.screenSize !== 'lg'} />
            </div>
          </Container>
        </Screen>
      )
    else if (this.state.status === 'naoaprovado')
      return (
        <Screen middle>
          <Container>
            <StatusErro />
            <div className={`py-3 d-flex justify-content-center${this.state.screenSize !== 'lg' ? ' flex-column' : ''}`}>
              <ButtonRetry block={this.state.screenSize !== 'lg'} url={this.trailUrl} />
              <ButtonBack block={this.state.screenSize !== 'lg'} />
            </div>
          </Container>
        </Screen>
      )
    else return <Redirect to="/perfil" />
  }
}

const mapStateToProps = (state) => ({
  login: state.login,
  perfil: state.perfil,
})
const mapDispatchToProps = (dispatch) => ({
  dispatch,
})
export default connect(mapStateToProps, mapDispatchToProps)(Status)
