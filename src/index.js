import React from 'react'
import { hydrate } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import reset from 'reset-css'
import 'bootstrap-4-grid/css/grid.css'
import 'font-awesome/css/font-awesome.min.css'

import App from './App'

import './index.css'

const render = Component => {
  hydrate(
    <AppContainer>
      <Component />
    </AppContainer>,
      document.getElementById('root')
  )
}

render(App)

if(module.hot) {
  module.hot.accept('./App', () => {
    const App = require('./App').default;
    render(App)
  })
}
