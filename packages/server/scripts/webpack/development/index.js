const chalk = require('chalk')
const webpack = require('webpack')
const path = require('path')
const NodemonPlugin = require('nodemon-webpack-plugin')

const base = require('../base')

module.exports = base({
  plugins: [
    new NodemonPlugin({
      nodeArgs: ['--inspect=9229']
    })
  ],
  output: {
    path: path.join(__dirname, '.build'),
    filename: 'server.js'
  },
  mode: 'development',
  watch: true
})
