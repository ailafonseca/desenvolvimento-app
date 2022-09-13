const userKey = '_login_saveadd'
const DEFAULT = JSON.parse(global.localStorage.getItem(userKey)) || { isLogged: false, submitting: false }

export default function (state = DEFAULT, action) {
  if (typeof state === 'undefined') return state

  switch (action.type) {
    case 'LOGIN_BEGIN':
      return { submitting: true }
    case 'LOGIN_INVALIDO':
      return { submitting: false }
    case 'LOGIN_UNDEFINED_ERROR':
      return { submitting: false }
    case 'LOGIN__SUCESS':
      global.localStorage.setItem(userKey, JSON.stringify({ ...action.payload, isLogged: true, submitting: false }))
      return { ...action.payload, isLogged: true, submitting: false }
    case 'LOGIN_LOGIN_FAIL':
    case 'LOGIN_LOGOUT':
      global.localStorage.removeItem(userKey)
      return { isLogged: false, submitting: false }
    default:
      return state
  }
}
