const path = require('path')
const webpack = require('webpack')
const precss = require('precss')
const autoprefixer = require('autoprefixer')

module.exports = {
  entry: {
    bundle: [path.join(__dirname, './src/client/index.js')]
  },
  output: {
    path: path.join(__dirname, './build'),
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/},
      {test: /\.css$/, loaders: ['style-loader', 'css-loader'], exclude: /node_modules/},
      {test: /\.scss$/, loaders: [
        'style-loader',
        {loader: 'css-loader', query: { sourceMap: true, module: true, localIdentName: '[name]__[local]___[hash:base64:5]'}},
        {loader: 'sass-loader', query: {sourceMap: true, outputStyle: 'expanded'}},
        'postcss-loader'
      ]}
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({ postcss: [precss, autoprefixer] })
  ]
}
