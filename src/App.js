import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import Routes from './main/routes'
import MainContainer from './main/main'

import axios from 'axios'
import Login from './modules/login/login'
import EsqueciSenha from './modules/esqueci-senha/esqueci-senha'
import RecuperarSenha from './modules/recuperar-senha/recuperar-senha'
import Signup from './modules/signup/signup'
import ExibirDetalhesProduto from './components/exibir-detalhes-produto/exibirDetalhesProduto'
import { logout } from './modules/login/loginActions'

import ErrorBoundary from './main/globalErrorHandler'
import CacheBuster from './CacheBuster'

import { isEmptyPerfil } from 'modules/perfil/util'

import SelecaoPerfil from 'modules/perfil/selecaoPerfil'

function DisplayCurrentUrlPath (viewPort) {
  return (
    <MainContainer>
      <ErrorBoundary>
        <Routes isInViewport={viewPort} />
      </ErrorBoundary>
    </MainContainer>
  )
}

function DisplayErrorRetry () {
  return (
    <div className='cachebuster-wrapper'>
      <MainContainer>
        <div className='block-content' />
        <ErrorBoundary>
          <div className='cachebuster-box'>
            <div>
              <p className='cachebuster-text'>Há um problema com a sua versão do sistema. Por favor, entre em contato com o suporte.</p>
            </div>
          </div>
        </ErrorBoundary>
      </MainContainer>
      <div className='block-content-2' />
    </div>
  )
}

/* global localStorage */
class App extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      inViewport: false
    }
  }

  isInViewport () {
    if (!this.elementFooter.current) return false
    const top = this.elementFooter.current.getBoundingClientRect().top
    const offset = window.pageYOffset
    const viewportmath = top + offset >= 0 && top - offset <= window.innerHeight
    this.setState({ inViewport: viewportmath })
  }

  componentDidMount () {
    if (this.props.login.isLogged && this.props.login.token) {
      axios.defaults.headers.common.Authorization = `bearer ${this.props.login.token}`
      axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
      axios.defaults.timeout = 30000

      axios.interceptors.request.use((request) => {
        return request
      })

      axios.interceptors.response.use(
        (response) => {
          return response
        },
        (error) => {
          if ((error.response !== undefined && error.response.status === 408) || error.code === 'ECONNABORTED') {
            console.log(`A timeout happend on url ${error.config.url}`)
          } else if (error.response !== undefined && error.response.status === 401 /* && error.response.data.error === "token_expired" */) {
            console.log('error 401', error.response.data.error)
            this.props.logout()
          }

          return Promise.reject(error)
        }
      )
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.login.token !== this.props.login.token) {
      axios.defaults.headers.common.Authorization = `bearer ${this.props.login.token}`
    }
  }

  render () {
    const { login, perfil } = this.props

    return (
      <CacheBuster>
        {({ loading, isLatestVersion, refreshCacheAndReload }) => {
          Object.keys(localStorage).map((ls) => {
            if (ls.indexOf('qtyRetries') < 0 || isNaN(localStorage.getItem('qtyRetries'))) {
              return localStorage.setItem('qtyRetries', -1)
            }
            return null
          })
          if (loading) return null
          if (!loading && !isLatestVersion && localStorage.getItem('qtyRetries') < 2) {
            // You can decide how and when you want to force reload
            localStorage.setItem('qtyRetries', parseInt(localStorage.getItem('qtyRetries')) + 1)
            return refreshCacheAndReload()
          }
          if (localStorage.getItem('qtyRetries') > 0) {
            localStorage.removeItem('qtyRetries')
            return (<DisplayErrorRetry />)
          }
          if (login.isLogged === true) {
            if (isEmptyPerfil(perfil)) {
              return <SelecaoPerfil />
            } else {
              return (<DisplayCurrentUrlPath viewPort={this.state.inViewport} />)
            }
          } else {
            return (
              <Switch>
                <Route exact path='/exibirdetalhes' component={ExibirDetalhesProduto} />
                <Route exact path='/cadastrar' component={Signup} />
                <Route exact path='/esqueci-senha' component={EsqueciSenha} />
                <Route exact path='/recuperar' component={RecuperarSenha} />
                <Route path='/' component={Login} />
                <Route exact path='/login' component={Login} />
              </Switch>
            )
          }
        }}
      </CacheBuster>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state,
  login: state.login,
  perfil: state.perfil,
  router: state.router
})
const mapDispatchToProps = (dispatch) => ({ dispatch, logout })
export default connect(mapStateToProps, mapDispatchToProps)(App)
