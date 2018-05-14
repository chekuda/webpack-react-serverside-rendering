const MiniCssExtraPlugin = require('mini-css-extract-plugin')

module.exports = {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtraPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
     new MiniCssExtraPlugin({
       filename: '[name].css',
       chunkFilename: '[id].css'
     })
  ]
}
