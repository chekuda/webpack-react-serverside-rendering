import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'

import App from '../../src/App/App'
import initialState from '../redux/configureStore/initialState'
import configureStore from '../../src/redux/configureStore'

const store = configureStore(initialState(), 'isDev')

const map = (req, res) => {
  const appToString =
    renderToString(
      <Provider store={store}>
        <App/>
      </Provider>
    )

  const templateData = {
    initialHtml: appToString,
    initialStore: JSON.stringify(store.getState())
  }

  res.render('index', templateData)
}

export default map