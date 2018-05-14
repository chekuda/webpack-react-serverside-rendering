import React from 'react'
import { renderToString } from 'react-dom/server'

import App from '../../src/App'

const map = (req, res) => {

  const appToString = renderToString(<App/>)

  const templateData = {
    body: appToString
  }

  res.render('index', templateData)
}

export default map