module.exports = {
  module: {
    entry: [
      'react-hot-loader/patch', // RHL patch
      './src/index.js'
    ],
    rules: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['react-hot-loader/webpack', 'babel'],
        include: path.join(__dirname, '../src')
      }
    ]
  }
}