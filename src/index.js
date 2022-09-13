import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import * as serviceWorker from './serviceWorker'
import '../node_modules/react-redux-toastr/lib/css/react-redux-toastr.min.css'
import ToastrItem from './main/toastrItem'

import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from './main/store'

import { isFomeDeTudo } from 'util/utils'

import '../node_modules/bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import './structure.css'
import './style.css'

const FomeDeTudoStyle = React.lazy(() => import('./components/fomedetudo'))

const store = configureStore(/* provide initial state if any */)

const ThemeSelector = ({ children }) => {
  if (isFomeDeTudo()) {
    return (
      <>
        <React.Suspense fallback={<></>}>
          <FomeDeTudoStyle />
        </React.Suspense>
        {children}
      </>
    )
  }
  return <>{children}</>
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeSelector>
        <App />
      </ThemeSelector>
      <ToastrItem />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
