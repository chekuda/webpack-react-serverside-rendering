import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackClientConfig from '../../webpack.config.js'
import webpackServerConfig from '../../webpack.config.server.js'

export default (server) => {
  // Use this middleware to set up hot module reloading via webpack.
  const clientConfig = webpackClientConfig()
  const serverConfig = webpackServerConfig()
  const compiler = webpack([clientConfig, serverConfig])
  const clientCompiler = compiler.compilers.find(({ name }) => name === 'client')

  server.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: clientConfig.output.filename,
    noInfo: true,
    stats: {
      colors: true
    },
    historyApiFallback: true,
    publicPath: clientConfig.output.publicPath,
    serverSideRender: true
  }))

  server.use(webpackHotMiddleware(clientCompiler, {
    log: console.log,
    heartbeat: 10 * 1000
  }))

  /*
    This is where the magic happens for the SSR hot reload.
    It will clear the require cache and require in the new files
    with the new code.
  */
  compiler.plugin('done', () => {
    Object.keys(require.cache).forEach((id) => {
      // Only delete cache for files in server and shared folders
      if (!/[\/\\]node_modules[\/\\]/.test(id)) {
        delete require.cache[id]
      }
    })
  })

}

