const path = require('path')
var Components = require('./components.json');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseWebpackConfig = require('../webpack.base.js')
const merge = require('webpack-merge')

delete Components.newComponent

module.exports = merge(baseWebpackConfig, {
    entry: Components,
    output: {
      filename: '[name]/index.js',
      path: path.resolve(process.cwd(), 'dist'),
      publicPath: '/dist/',
      library: '[name]',
      libraryTarget: 'umd',
      libraryExport: 'default',
      globalObject: 'typeof self !== \'undefined\' ? self : this'
    },
    module: {
      rules: [
        {
          test: /\.(tsx|ts)$/,
          exclude: /node_modules/,
          loader: ['ts-loader'],
        },
      ]
    },
    plugins:[
      new MiniCssExtractPlugin({
        filename: '[name]/style.css',
      })
    ]
})
