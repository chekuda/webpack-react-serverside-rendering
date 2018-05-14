import express from 'express'
import exphbs from 'express-handlebars'
import path from 'path'

import routes from './routes'

const server = express()

const port = process.env.PORT || 3000

const exphbsConfig = {
  defaultLayout: 'index',
  layoutsDir: path.join(__dirname, '/views')
}

server.engine('handlebars', exphbs(exphbsConfig))
server.set('views', exphbsConfig.layoutsDir)
server.set('view engine', 'handlebars')

server.use('/', routes)

server.listen(port, () => {
  console.log('Listen on port', port)
})

export default server