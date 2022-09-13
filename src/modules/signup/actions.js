import {
  requestApi
} from 'util/utils'
import {
  toastr
} from 'react-redux-toastr'
import axios from 'axios'
import {
  URL_CADASTRO_USUARIO,
  URL_CADASTRO_EMPRESA,
  URL_CADASTRO_DESEJOS
} from 'modules/urlsConstants'
import REDUCERS from 'modules/reducersConstants'

export const createUser = (data, callBackSuccess, callBackError) => {
  return (dispatch) => {
    dispatch({
      type: REDUCERS.CADASTRO.USUARIO.BEGIN,
      payload: data
    })
    return requestApi(dispatch, URL_CADASTRO_USUARIO, 'POST', data)
      .fetch()
      .then((result) => {
        if (result.data) {
          if (result.status === 400) {
            result.data.map((erro) => toastr.error('Erro no cadastro do usuário!', erro.mensagem))
            return dispatch({
              type: REDUCERS.CADASTRO.USUARIO.FAILURE
            })
          }
          toastr.success('Cadastro do usuário', 'Cadastro realizado com sucesso!')
          return dispatch({
            type: REDUCERS.CADASTRO.USUARIO.SUCCESS,
            payload: result.data
          },
          callBackSuccess(result.data)
          )
        }
      })
      .catch((err) => {
        if (err.request.status === 400) {
          err.response.data.map((i) => toastr.error(i.campo.toUpperCase(), i.mensagem))
        }
        return dispatch({
          type: REDUCERS.CADASTRO.USUARIO.POST.FAILURE
        })
      })
  }
}

export const createCompany = (token, data, callBackSuccess, callBackError) => {
  if (!token) return {}

  return (dispatch) => {
    dispatch({
      type: REDUCERS.CADASTRO.EMPRESA.POST.BEGIN,
      payload: data
    })
    return requestApi(dispatch, URL_CADASTRO_EMPRESA, 'POST', data, {
      Authorization: `bearer ${token.token || token}`
    })
      .fetch()
      .then((result) => {
        if (result && result.data) {
          if (result.data.status === 400) {
            toastr.error('Falha', 'Houve um erro ao atualizar o cadastro')
            return dispatch({
              type: REDUCERS.CADASTRO.EMPRESA.POST.FAILURE
            }, callBackError('result.data não existe'))
          }
          toastr.success('Cadastro do usuário', 'Cadastro realizado com sucesso!')
          return dispatch({
            type: REDUCERS.CADASTRO.EMPRESA.POST.SUCCESS,
            payload: data
          }, callBackSuccess(result.data))
        }
      })
      .catch((err) => {
        if (err.request.status === 400) {
          err.response.data.map((i) => toastr.error(i.campo.toUpperCase(), i.mensagem))
        }
        return dispatch({
          type: REDUCERS.CADASTRO.EMPRESA.POST.FAILURE
        })
      })
  }
}

export const createIntensoes = (token, data, callBackSuccess, callBackError) => {
  if (!token) return {}

  return (dispatch) => {
    dispatch({
      type: REDUCERS.CADASTRO.DESEJOS.BEGIN,
      payload: data
    })
    return requestApi(dispatch, URL_CADASTRO_DESEJOS, 'POST', data, {
      Authorization: `bearer ${token.token || token}`
    })
      .fetch()
      .then((result) => {
        if (result && result.data) {
          toastr.success('Cadastro', 'Cadastro finalizado com sucesso!')
          return dispatch({
            type: REDUCERS.CADASTRO.DESEJOS.SUCCESS
          }, callBackSuccess(result.data))
        }
        toastr.error('Falha', 'Houve um erro ao atualizar o cadastro')
        return dispatch({
          type: REDUCERS.CADASTRO.DESEJOS.FAILURE
        }, callBackError(result))
      })
      .catch(err => {
        toastr.error('Falha', 'Houve um erro ao atualizar o cadastro')
        return dispatch({
          type: REDUCERS.CADASTRO.DESEJOS.FAILURE
        }, callBackError(err))
      })
  }
}

export const getCnpjDetails = (cnpj, callbackSuccess) => {
  return (dispatch) => {
    dispatch({
      type: REDUCERS.EXTERNAL.CNPJ.BEGIN
    })
    const url = `/cnpj/${cnpj}`
    const headers = {
      Authorization: `Bearer ${process.env.REACT_APP_RECEITAWS_TOKEN}`,
      'Access-Control-Allow-Origin': 'receitaws.com.br',
      'Crossdomain:': 'true',
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/json;charset=UTF-8'
    }

    return axios
      .get(url, headers)
      .then((resp) => {
        if (resp.data.status === 'ERROR') {
          return toastr.error('Erro', resp.data.message)
        }

        return dispatch(callbackSuccess(resp.data))
      })
      .catch((error) => {
        if (error && error.response && error.response.status === 402) {
          return dispatch({
            type: 'CNPJPAYMENTERROR'
          })
        }
        return dispatch({
          type: REDUCERS.EXTERNAL.CNPJ.FAILURE,
          payload: error
        })
      })
  }
}

export const getAddress = (cepWithLeftPad, callbackSuccess) => {
  return (dispatch) => {
    dispatch({
      type: REDUCERS.EXTERNAL.CEP.BEGIN
    })
    const url = '/correios'
    const body = `<?xml version="1.0"?>\n<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cli="http://cliente.bean.master.sigep.bsb.correios.com.br/">\n<soapenv:Header />\n<soapenv:Body>\n<cli:consultaCEP>\n<cep>${cepWithLeftPad}</cep>\n</cli:consultaCEP>\n</soapenv:Body>\n</soapenv:Envelope>`

    return axios
      .post(url, body, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'text/xml;charset=UTF-8',
          'Cache-Control': 'no-cache',
          Accept: '*/*'
        }
      })
      .then((res) => {
        return dispatch(callbackSuccess(parseSuccessXML(res.data)))
      })
      .catch((err) => {
        if (err && err.response && err.response.status === 500) {
          toastr.error('Erro', 'Não encontramos o cep indicado, tente novamente!')
          return 'CEPNOTFOUND'
        }
        console.log('err', err)
        dispatch({
          type: REDUCERS.EXTERNAL.CEP.FAILURE,
          payload: err
        })
      })
  }
}

export const parseSuccessXML = (xmlString) => {
  const returnStatement = xmlString.replace(/\r?\n|\r/g, '').match(/<return>(.*)<\/return>/)[0] || ''
  const cleanReturnStatement = returnStatement.replace('<return>', '').replace('</return>', '')
  const parsedReturnStatement = cleanReturnStatement.split(/</).reduce((result, exp) => {
    const splittenExp = exp.split('>')
    if (splittenExp.length > 1 && splittenExp[1].length) {
      result[splittenExp[0]] = splittenExp[1]
    }
    return result
  }, {})

  return parsedReturnStatement
}
