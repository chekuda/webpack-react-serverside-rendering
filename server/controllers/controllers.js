import React from 'react'
import { renderToString } from 'react-dom/server'

import App from '../../src/App/App'

const map = (req, res) => {
  const appToString = renderToString(<App/>)
  
  console.log(appToString)

  const templateData = {
    initialHtml: appToString
  }

  res.render('index', templateData)
}

export default map