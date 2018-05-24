

var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry:{
    main:'./src/main.js'
  },
  output: {
    path:path.resolve(__dirname, './dist'),
    publicPath:'/',
    filename:'./static/js/[name].[hash:8].js'
  },
  externals:{

  },
  devServer:{
    contentBase: path.join(__dirname, "dist")
  },
  resolve:{
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module:{
    rules:[
      {
        test:/\.vue$/,
        loader:'vue-loader',
        options:{
          loaders: {
            'scss' : 'css-loader!sass-loader'
          }
        }
      },
      {
        test:/\.js$/,
        loader: 'babel-loader',
        exclude: /node_module/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
  
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    
  ]
  

}