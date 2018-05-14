import express from 'express'
import exphbs from 'express-handlebars'
import path from 'path'

import commonPaths from '../build-config/common-paths'
import routes from './routes'

const server = express()

const port = process.env.PORT || 3000

const exphbsConfig = {
  defaultLayout: 'index',
  layoutsDir: commonPaths.publicPath
}

server.engine('handlebars', exphbs(exphbsConfig))
server.set('views', exphbsConfig.layoutsDir)
server.set('view engine', 'handlebars')

server.use('/dist', express.static('dist'))

server.use('/', routes)

server.listen(port, () => {
  console.log('Listen on port', port)
})

export default server