import React from 'react'
import { hydrate } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'

import 'bootstrap-4-grid/css/grid.css'
import 'font-awesome/css/font-awesome.min.css'

import CustomGoogleMap from './containers/CustomGoogleMap'
import configureStore from './redux/configureStore'

import './index.scss'

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

render(CustomGoogleMap)

if(module.hot) {
  module.hot.accept('./containers/CustomGoogleMap', () => {
    const CustomGoogleMap = require('./containers/CustomGoogleMap').default;
    render(CustomGoogleMap)
  })
}
