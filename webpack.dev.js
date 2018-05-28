const ExtractTextPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  devtool: 'source-map',
  watch: true,
  mode: 'development',
  devServer: {
    contentBase: './dist',
    host: '0.0.0.0'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          publicPath: '../',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: loader => [
                  require('postcss-cssnext')()
                ],
                sourceMap: true
              }
            }
          ]
        })
      }
    ]
  }
})
