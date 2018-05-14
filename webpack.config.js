const webpackMerge = require('webpack-merge')

const commonConfig = require('./build-config/webpack-common')

module.exports = () => {
  console.log('ENVIRONMENT ', process.env.NODE_ENV)

  const envConfig = require(`./build-config/webpack-${process.env.NODE_ENV}.js`)

  const merged = webpackMerge(commonConfig, envConfig)

  return merged
}