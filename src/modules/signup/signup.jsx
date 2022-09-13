import React from 'react'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import './signup.css'
import validation from './validation'
import IntencaoComponent from './intencaoComponent'
import UsuarioComponent from './usuarioComponent'
import EmpresaComponent from './empresaComponent'
import REDUCERS from 'modules/reducersConstants'
import { IsOng } from './constants'
import { isFomeDeTudo } from 'util/utils'


// import UserDataForm from './userDataForm'

class Signup extends React.Component {
  constructor (props) {
    super(props)

    let initialStage = 1

    if (props.currentStage) {
      initialStage = props.currentStage
    } else {
      initialStage = props.loginMessage === 'EMPRESA_DESEJO' ? 3 : props.loginMessage === 'EMPRESA' ? 2 : 1
    }

    if (initialStage > 1 && props.token === undefined) initialStage = 1

    this.state = {
      section: initialStage,
      token: props.token,
      usuario: props.cadastro.usuario,
      empresa: props.cadastro.empresa,
      intensao: props.cadastro.intensao
    }
    this.formRef = React.createRef()
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.currentStage !== this.props.currentStage) {
      if (this.props.currentStage > 1 && !this.props.token) {
        this.setState({
          section: 1
        })
      } else {
        this.setState({
          section: this.props.currentStage
        })
      }
    }
  }

  handleValidation = (e) => {
    return validation(e)
  };

  renderConcluido = () => (
    <>
      <div className={`${this.state.section === 4 && 'section-visible'} signup-section`}>
        <center>
          <h5 className='card-title'>Cadastro concluído com sucesso.</h5>
          <button onClick={() => this.handleCancelGoLogin()} className='btn btn-primary saveadd-primary-color btn-save-signup'>
            Fazer login
          </button>
          <br /><br />
          <button onClick={() => this.goCadastro()} className='btn btn-secondary'>
            Cadastrar Novo Usuário
          </button>
        </center>
      </div>
    </>
  );

  renderCurrentSection = () => {
    const { section } = this.state
    const { token, cadastro } = this.props
    switch (section) {
      case 2:
        return (
          <EmpresaComponent
            dispatch={this.props.dispatch}
            onSuccess={this.handleEmpresaSuccess}
            onBack={this.handleBackToUsuario}
            token={token.token || token}
            cadastro={cadastro}
            cancelButton={<button onClick={() => this.handleCancelSignup()} className='btn btn-outline-danger mr-2'>Cancelar</button>}
          />
        )
      case 3:
        return (
          <IntencaoComponent
            dispatch={this.props.dispatch}
            onSuccess={this.handleIntensoesSuccess}
            token={token}
            isOng={IsOng(false)}
            cancelButton={<button onClick={() => this.handleCancelSignup()} className='btn btn-outline-danger mr-2'>Cancelar</button>}
          />
        )
      case 4:
        return this.renderConcluido()
      default:
        return (
          <UsuarioComponent
            dispatch={this.props.dispatch}
            onSuccess={this.handleBackToUsuario}
            onCancel={this.handleCancelGoLogin}
            cancelButton={<button onClick={() => this.handleCancelSignup()} className='btn btn-outline-danger mr-2'>Cancelar</button>}
          />
        )
    }
  };

  handleBackToUsuario = (token) =>
    this.props.dispatch([
      { type: REDUCERS.CADASTRO.STAGE.TOKEN, payload: token },
      { type: REDUCERS.CADASTRO.STAGE.SET, payload: 2 }
    ]);

  handleEmpresaSuccess = (resp) => {
    this.setState({ empresa: resp }, () => this.props.dispatch({ type: REDUCERS.CADASTRO.STAGE.SET, payload: 3 }))
  };

  handleIntensoesSuccess = () => this.props.dispatch({ type: REDUCERS.CADASTRO.STAGE.SET, payload: 4 });

  handleCancelGoLogin = () => {
    const { dispatch } = this.props

    dispatch({ type: REDUCERS.CADASTRO.STAGE.RESET }, { type: 'LOGIN_LOGOUT' })
    dispatch(push('/login'))
  };

  goCadastro = () => {
    const { dispatch } = this.props

    dispatch({ type: REDUCERS.CADASTRO.STAGE.RESET }, { type: 'LOGIN_LOGOUT' })
    dispatch(push('/cadastrar'))
  };

  handleCancelSignup = () => {
    const { dispatch } = this.props

    this.setState({ signupCanceled: true }, () => {
      dispatch({ type: REDUCERS.CADASTRO.CLEAN })
      dispatch(push('/login'))
    })
  }

  render () {
    const logo = process.env.PUBLIC_URL + (isFomeDeTudo() ? 'logoFome.svg' : 'logo.svg')
    /* return(
      <UserDataForm onSubmit={(event) => console.log(event)}></UserDataForm>
    ) */
    return (
      <div className='container'>
        <div className='card card-signup'>
          <div className='card-body'>
            <img id='saveadd-main-logo' style={{ width: '60%' }} src={logo} alt='' />
            {this.renderCurrentSection()}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loginMessage: state.login.message,
  token: state.login.token || state.cadastro.token,
  currentStage: state.cadastro.currentStage,
  cadastro: state.cadastro
})
const mapDispatchToProps = (dispatch) => ({ dispatch })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup)
