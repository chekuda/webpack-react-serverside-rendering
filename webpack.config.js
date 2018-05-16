const webpackMerge = require('webpack-merge')

const commonConfig = require('./build-config/webpack-common')

module.exports = () => {
  console.log('ENVIRONMENT ', process.env.ENV)

  const envConfig = require(`./build-config/webpack-${process.env.ENV}.js`)

  const merged = webpackMerge({ name: 'client' }, commonConfig, envConfig)

  return merged
}