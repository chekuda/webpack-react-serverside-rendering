import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'

import App from '../../src/containers/App/App'
import initialState from '../../src/redux/configureStore/initialState'
import configureStore from '../../src/redux/configureStore'


const map = (req, res) => {
  const store = configureStore(initialState())

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