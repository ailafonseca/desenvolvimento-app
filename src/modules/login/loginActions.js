import axios from 'axios'
import {
  toastr
} from 'react-redux-toastr'
import {
  push
} from 'connected-react-router'
import REDUCERS from 'modules/reducersConstants'

import {
  URL_LOGIN_BASE,
  URL_LOGIN_NEWTOKEN
} from '../urlsConstants'

const submitLoginSucess = (dispatch, result) => {
  console.log(result)
  if (result.status === 200) {
    toastr.success('Login sucesso', 'Login efetuado')
    dispatch({
      type: 'LOGIN__SUCESS',
      payload: result.data
    })
  }
}

const submitLoginCatch = (dispatch, error) => {
  if (error.response !== undefined) {
    const status = error.response.status
    if (status === 400) {
      dispatch({
        type: 'LOGIN_INVALIDO'
      })
      error.response.data.map((err) => toastr.error('Login inválido', err.mensagem))
    }
  } else {
    dispatch({
      type: 'LOGIN_UNDEFINED_ERROR'
    })
    toastr.error('Erro', 'Houve um erro não identificado')
  }
}

export const submitLogin = (values) => {
  const body = {
    username: values.inputCpf,
    password: values.inputPassword
  }
  const config = {
    'Content-Type': 'application/json',
    accept: 'application/json'
  }

  return (dispatch) => {
    dispatch({
      type: 'LOGIN_BEGIN',
      payload: values
    })
    axios
      .post(URL_LOGIN_BASE, body, config)
      .then((result) => submitLoginSucess(dispatch, result))
      .catch((err) => submitLoginCatch(dispatch, err))
      .finally(() => console.log(URL_LOGIN_BASE))
  }
}

export const newToken = () => {
  return (dispatch) => {
    dispatch({
      type: 'LOGIN_BEGIN'
    })
    axios
      .get(URL_LOGIN_NEWTOKEN)
      .then((result) => submitLoginSucess(dispatch, result))
      .catch((err) => submitLoginCatch(dispatch, err))
  }
}

export const logout = () => {
  return (dispatch) => {
    dispatch({
      type: 'LOGIN_LOGOUT'
    }, {
      type: REDUCERS.CADASTRO.CLEAN
    }, push('/'))
  }
}
