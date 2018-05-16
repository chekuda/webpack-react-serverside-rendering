import React from 'react'
import { hydrate } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import App from './App'

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
