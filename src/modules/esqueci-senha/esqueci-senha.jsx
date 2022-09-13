import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { push } from 'connected-react-router'
import Menu from 'main/menu'
import axios from 'axios'
import { URL_RECUPERAR_SENHA } from '../urlsConstants'
import { isFomeDeTudo } from 'util/utils'

import './esqueci-senha.css'

class esqueciSenha extends React.Component {
  verifyCPF = (cpf) => {
    if (cpf.length > 11) {
      this.setColor('red')
      this.setValido(false)
      return 'O CPF informado possui mais do que 11 caracteres. Por favor, insira um CPF válido.'
    }
    if (cpf.length < 11) {
      this.setColor('')
      this.setValido(false)
      return 'Por favor, insira um CPF com 11 caracteres.'
    }
    let firstVerification = 0,
      secondVerification = 0
    for (let i = 0; i < 9; i++) {
      firstVerification = firstVerification + parseInt(cpf[i], 10) * (10 - i)
    }
    firstVerification = (firstVerification * 10) % 11
    if (firstVerification === 10) firstVerification = 0
    if (firstVerification !== parseInt(cpf[9])) {
      this.setColor('red')
      this.setValido(false)
      return 'CPF inválido. Por favor, insira um CPF válido.'
    }
    for (let i = 0; i < 10; i++) {
      secondVerification = secondVerification + cpf[i] * (11 - i)
    }
    secondVerification = (secondVerification * 10) % 11
    if (secondVerification === 10) secondVerification = 0
    if (secondVerification !== parseInt(cpf[10])) {
      this.setColor('red')
      this.setValido(false)
      return 'CPF inválido. Por favor, insira um CPF válido.'
    }
    this.setColor('green')
    this.setValido(true)
    return 'CPF válido. Clique no botão REDEFINIR SENHA.'
  }

  requestNewPassword = () => {
    this.setWaiting(true)
    axios
      .post(
        URL_RECUPERAR_SENHA,
        { cpf: this.state.cpf },
        {
          headers: {
            Authorization: '44d4a4fe1c84760f548c79890b1961a5bf67b2c33b72388939d4d291aae26fcc',
          },
        }
      )
      .then(() => {
        this.setMessage(2)
      })
      .catch((error) => {
        this.setValido(false)
        if (error.response.status === 400 && error.response.data[0].mensagem[0] === 'C') {
          this.setAviso('CPF não encontrado em nosso sistema. Verifique seus dados e tente novamente.')
          this.setColor('red')
          this.setValido(false)
        } else {
          this.setMessage(3)
        }
      })
      .finally(() => this.setWaiting(false))
  }

  constructor(props) {
    super(props)
    this.state = {
      color: '',
      aviso: 'Insira um CPF válido',
      message: 1,
      valido: false,
      waiting: false,
      tamCPF: 0,
      cpf: '',
    }
  }

  setColor = (color) => {
    this.setState({ color })
  }

  setAviso = (aviso) => {
    this.setState({ aviso })
  }

  setCPF = (cpf) => {
    this.setState({ cpf })
    this.setMessage(1)
    this.setAviso(this.verifyCPF(cpf))
    this.setTamCPF(cpf.length)
  }

  setMessage = (message) => {
    this.setState({ message })
  }

  setValido = (valido) => {
    this.setState({ valido })
  }

  setWaiting = (waiting) => {
    this.setState({ waiting })
  }

  setTamCPF = (tamCPF) => {
    this.setState({ tamCPF })
  }

  componentDidMount() {
    this.props.initialize({ inputCpf: this.props.location.state.cpf })
  }

  render() {
    const { login, dispatch } = this.props

    if (login !== undefined && login.isLogged === true) return <Menu />

    const logo = process.env.PUBLIC_URL + (isFomeDeTudo() ? 'logoFome.svg' : 'logo.svg')

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin">
              <div className="card-body">
                <img id="saveadd-main-logo" src={logo} alt="" />
                <div className="sucesso" style={{ display: this.state.message === 2 ? 'none' : '' }}>
                  <h5 className="card-title text-center">Esqueci minha senha</h5>
                  <p className="text-left">Para redefinir sua senha, informe o CPF que você usou para se cadastrar.</p>
                  <form className="form-signin">
                    <div className="form-label-group">
                      <label htmlFor="cpf">CPF</label>
                      <Field
                        onChange={(event) => {
                          this.setCPF(event.target.value)
                        }}
                        value={this.state.cpf}
                        component="input"
                        type="text"
                        name="inputCpf"
                        className="form-control"
                        placeholder="Insira seu CPF"
                        required
                        autoFocus
                      />
                    </div>
                    <div
                      className="text-left"
                      style={{
                        marginTop: `${10}px`,
                        marginBottom: `${10}px`,
                      }}
                    >
                      <small style={{ display: this.state.message === 3 ? 'inline' : 'none', color: 'red' }}>
                        Não é possível recuperar sua senha, pois não há um e-mail cadastrado para confirmarmos a propriedade da conta. Entre em contato com a Saveadd pelo email
                        <a style={{ display: 'inline-block', margin: `${10}px ${5}px` }} href="mailto:saveadd@saveadd.com?Subject=Cadastrar%20email%20para%20CPF">
                          saveadd@saveadd.com
                        </a>
                        .
                      </small>
                      <small style={{ display: this.state.message === 1 ? 'inline' : 'none', color: this.state.color }}>{this.state.aviso}</small>
                    </div>
                    <button
                      className="btn btn-lg btn-primary btn-block"
                      disabled={this.state.tamCPF < 11 || this.state.waiting || !this.state.valido}
                      onClick={() => {
                        this.requestNewPassword()
                      }}
                    >
                      {this.state.waiting ? <FontAwesomeIcon spin icon={faSpinner} /> : 'REDEFINIR SENHA'}
                    </button>

                    <br />
                  </form>
                </div>
                <div className="sucesso" style={{ display: this.state.message === 2 ? '' : 'none' }}>
                  <h5 className="card-title text-center">Link enviado por email</h5>
                  <p className="text-left">
                    Enviamos para você por email um link para que você possa realizar a sua troca de senha. Por favor, verifique sua caixa de entrada e siga as instruções enviadas.
                  </p>
                </div>
                <div className="text-center">
                  <button
                    className="btn btn-lg"
                    onClick={() => {
                      dispatch(push('/login'))
                    }}
                  >
                    <FontAwesomeIcon icon={faArrowLeft} /> Voltar para página de login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

var esqueciSenhaForm = reduxForm({ form: 'EsqueciSenha' })(esqueciSenha)

const mapStateToProps = (state) => ({ login: state.login })
const mapDispatchToProps = (dispatch) => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProps)(esqueciSenhaForm)
