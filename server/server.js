import express from 'express'
import exphbs from 'express-handlebars'
import path from 'path'

import commonPaths from '../build-config/common-paths'
import routes from './routes'

const server = express()

if(process.env.ENV !== 'prod') {
  require('./middleware/expresswebpack.js').default(server)
}

const port = process.env.PORT || 5000

const exphbsConfig = {
  defaultLayout: 'index',
  layoutsDir: commonPaths.publicPath
}

server.engine('handlebars', exphbs(exphbsConfig))
server.set('views', exphbsConfig.layoutsDir)
server.set('view engine', 'handlebars')

server.use('/dist', express.static('dist'))

server.use((req, res, next) => {
  require('./routes').default(req, res, next)
})

server.listen(port, () => {
  console.log('Listen on port', port)
})

export default server