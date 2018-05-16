import webpack from 'webpack'
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin'

import commonPaths from './common-paths'

module.exports = {
  entry: [
    'react-hot-loader/patch', // RHL patch
    'webpack-hot-middleware/client', // HRM in client side
    './src/index.js'
  ],
  plugins: [
    new HtmlWebpackHarddiskPlugin({
      outputPath: commonPaths.publicPath
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  mode: 'development'
}