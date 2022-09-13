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

//Mensagens de sucesso/erro que podem ser exibidas para o usuário
const mensagensPossiveis = [
  'Insira senhas iguais nos dois campos.',
  'As senhas inseridas não coincidem. Por favor, insira senhas iguais.',
  'As senhas inseridas coincidem. Clique no botão "Redefinir senha".',
  'Não foi possível concluir sua solicitação. Recomendamos que entre em seu email e clique novamente no link que enviamos para redefinição de senha.',
  'Insira uma senha com, pelo menos, 8 caracteres.',
]

class recuperarSenha extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      color: '',
      codigo: '',
      cpf: '___.___.___-__',
      message: 0,
      waiting: false,
      tamSenha: 0,
      tamSenhaRepetida: 0,
      senha: '',
      senhaRepetida: '',
      sucesso: false,
    }
  }

  verifyPassword = () => {
    if (this.state.tamSenha < 8) {
      this.setMessage(4)
      this.setColor('')
    } else if (this.state.senha === this.state.senhaRepetida) {
      this.setMessage(2)
      this.setColor('green')
    } else if (this.state.tamSenha <= this.state.tamSenhaRepetida) {
      this.setMessage(1)
      this.setColor('red')
    } else {
      this.setMessage(0)
      this.setColor('red')
    }
  }

  setColor = (color) => {
    this.setState({ color })
  }

  setCodigo = (codigo) => {
    this.setState({ codigo })
  }

  setCpf = (cpf) => {
    this.setState({ cpf })
  }

  setMessage = (message) => {
    this.setState({ message })
  }

  setWaiting = (waiting) => {
    this.setState({ waiting })
  }

  setTamSenha = (tamSenha) => {
    this.setState({ tamSenha })
  }

  setTamSenhaRepetida = (tamSenhaRepetida) => {
    this.setState({ tamSenhaRepetida })
  }

  setSenha = (senha) => {
    this.setState({ senha }, this.verifyPassword)
    this.setTamSenha(senha.length)
  }

  setSenhaRepetida = (senhaRepetida) => {
    this.setState({ senhaRepetida }, this.verifyPassword)
  }

  setSucesso = (sucesso) => {
    this.setState({ sucesso })
  }

  getCpfByCode = (codigo) => {
    axios
      .get(`${URL_RECUPERAR_SENHA}/${codigo}`, {
        headers: {
          Authorization: '44d4a4fe1c84760f548c79890b1961a5bf67b2c33b72388939d4d291aae26fcc',
        },
      })
      .then((result) => {
        this.setCpf(
          `${result.data[0]}${result.data[1]}${result.data[2]}.${result.data[3]}${result.data[4]}${result.data[5]}.${result.data[6]}${result.data[7]}${result.data[8]}-${result.data[9]}${result.data[10]}`
        )
      })
      .catch((error) => {
        this.setCpf('CPF não encontrado. Verifique seu email e tente novamente.')
      })
  }

  //Recebe o código para alteração da senha e o coloca no state local do component
  componentDidMount() {
    this.setCodigo(this.props.location.search.slice(6))
    this.getCpfByCode(this.props.location.search.slice(6))
  }

  redefinePassword = () => {
    this.setWaiting(true)
    axios
      .post(
        `${URL_RECUPERAR_SENHA}/alterarsenha`,
        { codigo: this.state.codigo, senha: this.state.senha, confirmacaosenha: this.state.senhaRepetida },
        {
          headers: {
            Authorization: '44d4a4fe1c84760f548c79890b1961a5bf67b2c33b72388939d4d291aae26fcc',
          },
        }
      )
      .then(() => this.setSucesso(true))
      .catch((error) => this.setMessage(3))
      .finally(() => this.setWaiting(false))
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
                <div className="sucesso" style={{ display: this.state.sucesso === true ? 'none' : '' }}>
                  <h5 className="card-title text-center">Redefinir minha senha</h5>
                  <p className="text-left">Insira uma nova senha para a sua conta na Saveadd.</p>
                  <p className="text-left" style={{ marginBottom: `${0}px` }}>
                    CPF
                  </p>
                  <p className="text-left">
                    <strong>{this.state.cpf}</strong>
                  </p>
                  <form className="form-signin">
                    <div className="form-label-group">
                      <label htmlFor="novaSenha">Nova senha</label>
                      <Field
                        onChange={(event) => {
                          this.setSenha(event.target.value)
                        }}
                        component="input"
                        type="password"
                        name="inputSenha"
                        className="form-control"
                        placeholder="Insira sua nova senha"
                        required
                        autoFocus
                      />

                      <br />

                      <label htmlFor="novaSenhaRepetida">Repetir nova senha</label>
                      <Field
                        onChange={(event) => {
                          this.setSenhaRepetida(event.target.value)
                        }}
                        component="input"
                        type="password"
                        name="inputSenhaRepetida"
                        className="form-control"
                        placeholder="Repita sua nova senha"
                        required
                      />
                    </div>

                    <div
                      className="text-left"
                      style={{
                        color: this.state.message === 3 ? 'red' : this.state.color,
                        marginTop: `${10}px`,
                        marginBottom: `${10}px`,
                      }}
                    >
                      <small>{mensagensPossiveis[this.state.message]}</small>
                    </div>

                    <button
                      className="btn btn-lg btn-primary btn-block"
                      disabled={this.state.senha !== this.state.senhaRepetida || this.state.tamSenha < 8 || this.state.waiting}
                      onClick={() => {
                        this.redefinePassword()
                      }}
                    >
                      {this.state.waiting ? <FontAwesomeIcon spin icon={faSpinner} /> : 'REDEFINIR SENHA'}
                    </button>
                  </form>
                </div>

                <br />
                <br />

                <div className="sucesso" style={{ display: this.state.sucesso === true ? '' : 'none' }}>
                  <h5 className="card-title text-center">Sucesso ao redefinir senha!</h5>
                  <p className="text-left">Agora você já pode fazer seu login com a nova senha da sua conta Saveadd. Clique no botão abaixo para ter acesso à sua conta.</p>
                </div>

                <div className="text-center">
                  <button
                    className="btn btn-lg"
                    onClick={() => {
                      dispatch(push('/login'))
                    }}
                    style={{
                      paddingRight: `${0}px`,
                      paddingLeft: `${0}px`,
                    }}
                  >
                    <FontAwesomeIcon icon={faArrowLeft} /> Ir para a página de login
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

var recuperarSenhaForm = reduxForm({ form: 'RecuperarSenha' })(recuperarSenha)

const mapStateToProps = (state) => ({ login: state.login })
const mapDispatchToProps = (dispatch) => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProps)(recuperarSenhaForm)
