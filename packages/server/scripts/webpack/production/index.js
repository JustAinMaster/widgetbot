const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const WebpackOnBuildPlugin = require('on-build-webpack')
const path = require('path')

const base = require('../base')
const structure = require('./structure')
const root = path.join(__dirname, '../../..')

module.exports = base({
  plugins: [
    new CleanWebpackPlugin(['dist/**/*'], { root }),
    new WebpackOnBuildPlugin(stats => {
      structure(stats)
    })
  ],
  mode: 'production',
  output: {
    path: path.join(root, 'dist'),
    filename: 'widgetbot.js'
  }
})
