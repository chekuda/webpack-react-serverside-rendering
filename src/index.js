import React from 'react'
import { hydrate } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'

import reset from 'reset-css'
import 'bootstrap-4-grid/css/grid.css'
import 'font-awesome/css/font-awesome.min.css'

import App from './containers/App'
import configureStore from './redux/configureStore'
import initialState from './redux/configureStore/initialState'

import './index.css'

const store = configureStore(window.__INITIAL_STORE__)

const render = Component => {
  hydrate(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
      document.getElementById('root')
  )
}

render(App)

if(module.hot) {
  module.hot.accept('./containers/App', () => {
    const App = require('./containers/App').default;
    render(App)
  })
}
