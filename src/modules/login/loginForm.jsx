import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { push } from 'connected-react-router'
import Menu from 'main/menu'
import { isFomeDeTudo } from 'util/utils'

class loginForm extends React.Component {
  render () {
    const { state, handleSubmit, pristine, invalid, login, dispatch } = this.props
    if (login !== undefined && login.isLogged === true) return <Menu />

    const logo = process.env.PUBLIC_URL + (isFomeDeTudo() ? 'logoFome.svg' : 'logo.svg')

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-9 col-md-7 col-lg-5 mx-auto'>
            <div className='card card-signin'>
              <div className='card-body'>
                <img id='saveadd-main-logo' src={logo} alt='' />
                <h5 className='card-title text-center'>Login</h5>
                <form onSubmit={handleSubmit} className='form-signin'>
                  <div className='form-label-group'>
                    <label htmlFor='cpf'>CPF</label>
                    <Field component='input' type='text' name='inputCpf' className='form-control' placeholder='CPF' required autoFocus />
                  </div>
                  <br />
                  <div className='form-label-group'>
                    <label htmlFor='inputPassword'>Senha</label>
                    <Field component='input' type='password' name='inputPassword' className='form-control' placeholder='Senha' required style={{ marginBottom: `${20}px` }} />
                  </div>
                  <div className='text-right'>
                    <button
                      type='button'
                      className='btn btn-sm'
                      onClick={() => dispatch(push('/esqueci-senha', { cpf: typeof state.form.Login.values === 'undefined' ? '' : state.form.Login.values.inputCpf }))}
                      style={{
                        paddingRight: `${0}px`,
                        paddingLeft: `${0}px`,
                        color: 'blue',
                        textDecoration: 'underline'
                      }}
                    >
                      Esqueceu sua senha? Clique aqui
                    </button>
                  </div>
                  <hr className='my-4' />
                  <button className='btn btn-lg btn-primary btn-block text-uppercase' type='submit' disabled={pristine || login.submitting || invalid}>
                    {login.submitting ? <FontAwesomeIcon spin icon={faSpinner} /> : 'Login'}
                  </button>
                  <br />
                  <div className='text-right'>
                    <small>Não tem usuário?&nbsp;&nbsp;</small>
                    <button type='button' className='btn btn-sm btn-secondary' onClick={() => dispatch(push('/cadastrar'))}>
                      Cadastre-se aqui
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

var reduxChangePasswordForm = reduxForm({ form: 'Login' })(loginForm)

const mapStateToProps = (state) => ({ state, login: state.login })
const mapDispatchToProps = (dispatch) => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProps)(reduxChangePasswordForm)
