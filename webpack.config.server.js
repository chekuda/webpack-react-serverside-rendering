const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const commonPaths = require('./build-config/common-paths')

module.exports = () => {
  console.log('ENVIRONMENT FOR SERVER CONFIG', process.env.ENV)

  return {
    mode: 'development',
    name: 'server',
    entry: './server',
    externals: [nodeExternals()],
    output: {
      path: commonPaths.publicPath,
      filename: 'server.js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader'
            }
          ]
        }
      ]
    },
    target: 'node',
    plugins: [
      new webpack.IgnorePlugin(/\.css$/)
    ],
    resolve: {
      extensions: ['.js', '.json', '.jsx'] //Add this in order to dont indicate the extension when import it
    }
  }
}