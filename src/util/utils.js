import axios from 'axios'
import { toastr } from 'react-redux-toastr'

// TODO: Transformar esse arquivo em mini-arquivos especificos por utilidade E adicionar um index para centralizar a importação

// TODO: adicionar ordenação para palavras com caracteres especiais
export const orderProductsAsc = (stateSource) =>
  stateSource.sort(function (a, b) {
    if (a.nomeProduto > b.nomeProduto) {
      return 1
    }
    if (a.nomeProduto < b.nomeProduto) {
      return -1
    }
    return 0
  })

export const isArrayEmpty = (array) => {
  return !(Array.isArray(array) && array.length > 0)
}

export const isArrayNotEmpty = (array) => !isArrayEmpty(array)

export const orderGruposAsc = (stateSource) =>
  stateSource.sort(function (a, b) {
    if (a.nome > b.nome) {
      return 1
    }
    if (a.nome < b.nome) {
      return -1
    }
    return 0
  })

export const normalizeGrupo = (grupo) => {
  if (grupo.length === 0) return []
  const newGrupo =
    grupo.length &&
    Object.values(grupo).length &&
    Object.values(grupo).map((i) => {
      return {
        ...i,
        nome: i.grupo !== undefined && Object.keys(i.grupo).length > 0 ? i.grupo.nome : i.nome
      }
    })
  return newGrupo
}

export const defaultHeaders = {
  // credentials: 'same-origin',
  // 'Aplication-source': 'react',
  'Content-type': 'application/json'
}

export const requestApi = (dispatch, endpoint, method = 'GET', body, header) => {
  const headerCopy = header
    ? {
        ...header
      }
    : {}

  const ret = {
    axios: () => {}
  }

  if (!endpoint) return ret

  let ep = endpoint
  let config = {
    url: ep,
    method: method || 'GET',
    headers: {
      ...defaultHeaders,
      ...headerCopy
    }
  }

  if (typeof document === 'undefined') {
    ep = `${process.env.REACT_APP_API}${endpoint}`
  }

  if (body) {
    config = {
      url: ep,
      ...config,
      data: body
    }
  }

  ret.fetch = () =>
    axios(config)
      .then((res) => {
        // VALIDAR: como tratar as respostas 204 e 404
        // if (res.status === 204) {
        //   return dispatch({ type: 'ERRNOTEXIST' })
        // }
        return res
      })
      .catch((error) => {
        const hasStatus = error !== undefined && error.response !== undefined && error.response.status !== undefined
        const is404 = hasStatus && error.response.status === 404
        const is500 = hasStatus && error.response.status === 500
        const is400 = hasStatus && error.response.status === 400

        if (is404 || is500 || is400) {
          return error.response
        }
        if (error.code === 'ECONNABORTED') {
          toastr.error('Erro', 'Timeout. Tente novamente.')
          return dispatch({
            type: 'ECONNABORTED'
          })
        } else if (
          error
            .toString()
            .toLowerCase()
            .indexOf('network error') > -1
        ) {
          toastr.error('Erro', 'Servidor não disponível no momento.')
          return dispatch({
            type: 'SERVERNOTFOUND'
          })
        } else if (error.response !== undefined) {
          const status = error.response.status
          if (status === 400) {
            toastr.error('Erro', 'Erro na requisição')
            return Promise.reject(error)
          } else if (status === 403) {
            toastr.error('Erro', 'Você não tem permissão para acessar esses dados.')
            return dispatch({
              type: 'ERRFORBIDDEN'
            })
          }
        } else {
          toastr.error('Erro', 'Houve um erro não identificado')
          return Promise.reject(error)
        }
      })

  return ret
}

export const validateCpf = (strCPF) => {
  let sum = 0
  let rest = 0
  if (strCPF === '00000000000') return false

  for (let i = 1; i <= 9; i++) sum = sum + parseInt(strCPF.substring(i - 1, i)) * (11 - i)
  rest = (sum * 10) % 11

  if (rest === 10 || rest === 11) rest = 0
  if (rest !== parseInt(strCPF.substring(9, 10))) return false

  sum = 0
  for (let i = 1; i <= 10; i++) sum = sum + parseInt(strCPF.substring(i - 1, i)) * (12 - i)
  rest = (sum * 10) % 11

  if (rest === 10 || rest === 11) rest = 0
  if (rest !== parseInt(strCPF.substring(10, 11))) return false
  return true
}

export const validateCnpj = (s) => {
  const cnpj = s.replace(/[^\d]+/g, '')

  if (cnpj.length !== 14) return false
  if (/^(\d)\1+$/.test(cnpj)) return false

  const tamanho = cnpj.length - 2
  const digitos = cnpj.substring(tamanho)
  const digito1 = parseInt(digitos.charAt(0))
  const digito2 = parseInt(digitos.charAt(1))
  const calc = (x) => {
    const n = cnpj.substring(0, x)
    let y = x - 7
    let s = 0
    let r = 0

    for (let i = x; i >= 1; i--) {
      s += n.charAt(x - i) * y--
      if (y < 2) y = 9
    }

    r = 11 - (s % 11)
    return r > 9 ? 0 : r
  }

  return calc(tamanho) === digito1 && calc(tamanho + 1) === digito2
}

export const findReactComponent = (dom) => {
  const key = Object.keys(dom).find((key) => key.startsWith('__reactInternalInstance$'))
  const internalInstance = dom[key]
  if (internalInstance == null) return null

  if (internalInstance.return) {
    // react 16+
    return internalInstance._debugOwner ? internalInstance._debugOwner.stateNode : internalInstance.return.stateNode
  } else {
    // react <16
    return internalInstance._currentElement._owner._instance
  }
}

export const formataCPF = (cpf) => {
  if (cpf === undefined || cpf == null || cpf.length < 11) return cpf

  return cpf.replace(/[^\d]/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

export const formatCnpjCpf = (value) => {
  const CPF_LENGTH = 11
  const cnpjCpf = value.replace(/\D/g, '')

  if (cnpjCpf.length === CPF_LENGTH) {
    return cnpjCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4')
  }

  return cnpjCpf.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5')
}

export const screenSize = () => {
  const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  return w < 768 ? 'xs' : w < 992 ? 'sm' : w < 1200 ? 'md' : 'lg'
}

export const isNullOrEmpty = (text) => {
  if (typeof text === 'string' || typeof text === 'undefined' || text === null) {
    return text === null || text === undefined || text.trim().length === 0
  } else if (typeof text === 'number' || typeof text === 'symbol' || typeof text === 'function' || typeof text === 'object' || typeof text === 'boolean') {
    return false
  }
  return -1
}

export const isNotNullOrEmpty = (text) => !isNullOrEmpty(text)

export const isObjectReady = (obj) => obj !== undefined && obj !== null && typeof obj === 'object'

export const isNumberPositive = (num) => num !== undefined && num !== null && typeof num === 'number' && num > 0

export const getNumberPositiveOrZero = (num) => {
  if (num === undefined || num === null || (typeof num !== 'number' && typeof num !== 'string')) {
    return 0
  }
  if (typeof num === 'number' || (typeof num === 'string' && /^[\d,.]+$/.test(num))) {
    return parseFloat(num)
  }
  return 0
}

export const isNumberZeroOrMore = (num) => num !== undefined && num !== null && typeof num === 'number' && num >= 0

export const isNumber = (num) => num !== undefined && num !== null && typeof num === 'number'

export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new global.FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
    reader.readAsDataURL(file)
  })

export const isFomeDeTudo = () => {
  const url = process.env.PUBLIC_URL || window.location.host
  console.log('URL', url)
  return url.includes('fomedetudo.saveadd') || url.includes('fdt-dev.saveadd') || url.includes('fdt-stage.saveadd')
}
