var path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const _entry = (() => {
  var NODE_ENV =  process.env.NODE_ENV;
  if(NODE_ENV === 'production'){
    return path.resolve(__dirname, 'table/index.js')
  }else {
    return path.resolve(__dirname, 'src/main.js')
  }
})()
 
module.exports = {
  mode:process.env.NODE_ENV,
  entry:{
    main:_entry
  },
  output: {
    libraryTarget: 'umd',
    path:path.resolve(__dirname, './dist'),
    publicPath:'/',
    filename:'jr-table.min.js'
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
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader',
        options: {
          name: 'images/icon/[name].[ext]'
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name]-[hash:5].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                // progressive:渐进式图片
                progressive: true,
                quality: 85
              },
              gifsicle: {
                interlaced: true,
              },
              // pngquant:{
              //   quality: "65-90",
              //   speed: 4
              // },
              optipng: {
                optimizationLevel: 7,
              },
              svgo: {
                plugins: [
                  {
                    removeViewBox: false
                  },
                  {
                    removeEmptyAttrs: false
                  }
                ]
              }
            }
          }]
      }
  
    ]
  },
  plugins:[

    
  ]

}
if(process.env.NODE_ENV === 'development'){
  module.exports.plugins = (module.exports.plugins || []).concat([new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  })],
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'index.html',
    inject: true
  }))
}