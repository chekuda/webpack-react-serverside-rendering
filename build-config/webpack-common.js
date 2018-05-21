const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtraPlugin = require('mini-css-extract-plugin')

const commonPaths = require('./common-paths')

module.exports = {
  output: {
    filename: 'bundle.js',
    path: commonPaths.publicPath,
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          'extracted-loader',
          MiniCssExtraPlugin.loader,
          'css-loader'
        ]
      },
      { // In order to use FontAwesome
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader',
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: `${commonPaths.srcPath}/index.handlebars`,
      filename: 'index.handlebars',
      alwaysWriteToDisk: true,
      inject: 'body'
    }),
    new MiniCssExtraPlugin({
      filename: '[name].css'
    })
  ],
  resolve: {
    extensions: [ '.js', '.jsx']
  }
}