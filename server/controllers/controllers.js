import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import serializeJS from 'serialize-javascript'

import CustomGoogleMap from '../../src/containers/CustomGoogleMap'
import configureStore from '../../src/redux/configureStore'
import dummySpots from '../dummySpots'

const map = (req, res) => {
  const initialState = {
    spots: dummySpots(),
    map: {
      continentSelected: 'europe'
    }
  }

  const store = configureStore(initialState)

  const appToString =
    renderToString(
      <Provider store={store}>
        <CustomGoogleMap/>
      </Provider>
    )

  const templateData = {
    initialHtml: appToString,
    initialStore: serializeJS(store.getState(), { isJSON: true })
  }

  res.render('index', templateData)
}

export default map