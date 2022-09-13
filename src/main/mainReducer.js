const menuKey = '_menu_saveadd'
const DEFAULT = JSON.parse(global.localStorage.getItem(menuKey)) || {
  tabSelectedMainMenu: 0
}

const globalReducer = (state = DEFAULT, action) => {
  switch (action.type) {
    case 'ECONNABORTED':
      return {
        ...state,
        connection: 'ECONNABORTED'
      }
    case 'SERVERNOTFOUND':
      return {
        ...state,
        connection: 'SERVERNOTFOUND'
      }
    case 'ERRFORBIDDEN':
      return {
        ...state,
        connection: 'ERRFORBIDDEN'
      }
    case 'ERRNOTEXIST':
      return {
        ...state,
        connection: 'ERRNOTEXIST'
      }
    case 'RESETCONNECTION':
      return {
        ...state,
        connection: undefined
      }
    case 'SELECT_TAB_MAIN_MENU': {
      const tabToSelect = action.payload === 'D' ? 1 : 0
      global.localStorage.setItem(
        menuKey,
        JSON.stringify({
          tabSelectedMainMenu: tabToSelect
        })
      )

      return {
        ...state,
        tabSelectedMainMenu: tabToSelect
      }
    }
    default:
      return state
  }
}

export default globalReducer
