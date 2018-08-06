// @ts-check
const { injectBabelPlugin, getLoader } = require('react-app-rewired')

module.exports = function override(config, env) {
  const loaders = config.module.rules[1].oneOf
  const tsRule = loaders[2]
  tsRule.use.unshift('babel-loader')

  loaders.unshift({
    test: /\.(graphql|gql)$/,
    exclude: /node_modules/,
    loader: 'graphql-tag/loader'
  })

  return config
}
