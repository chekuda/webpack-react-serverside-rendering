import React from 'react'
import { hydrate } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'

import 'bootstrap-4-grid/css/grid.css'
import 'font-awesome/css/font-awesome.min.css'

import App from './containers/App'
import configureStore from './redux/configureStore'

import './index.css'

const store = configureStore(window.__INITIAL_STORE__)
console.log('STORE', store)

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
