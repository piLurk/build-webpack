

var path = require('path');

module.exports = {
  entry:{
    main:'./src/main.js'
  },
  output: {
    path:path.resolve(__dirname, './dist'),
    publicPath:'/dist/',
    filename:'/static/js/[name].[chunkhash].js'
  },
  externals:{
    $:"jQuery"
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
      }
  
    ]
  },
  

}