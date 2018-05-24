
var config = require('../config')


function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    vendor:['vue', 'vue-router', 'lodash', 'vuex'], //第三方库，提出来，方便做缓存
    app:'./src/main.js'
  },
  output: {
    path: config.build.distPath,
    filename:'[name].js',
    publicPath:'/'
  },
  resolve: {
    alias: { //别名
      'vue$': 'vue/dist/vue.esm.js',
      '@':resolve('src'),
      'components': resolve('src/components'),
      'utils': resolve('src/utils')
    },
    extensions:['.js', '.vue', '.json'], //扩展名匹配规则
    mainFields:['module', 'main'],   //修改包查找路径(有package.json文件时)， 默认是module ,main
    mainFiles: ['index'],  //没有package.json时，默认使用当前目录下index.js。这个也可以配置。
  },
  module:{
    rules: [
      // {
      //   test: /\.jsx?/, // 条件
      //   include: [ 
      //     path.resolve(__dirname, 'src'),
      //   ], // 条件
      //   use: 'babel-loader', // 规则应用结果
      // }, // 一个 object 即一条规则

      {
        resource: {
          test: /\.vue$/,
          include: [
            resolve('src')
          ]
        },
        use: 'vue-loader' // 是loaders的别名
      },
      {
        resource: {
          test: /\.js$/,
          include: [
            resolve('src'),
            resolve('test')
          ]
        },
        use: 'babel-loader' // 
      },
      {
        resource: {
          test: /.*\.(gif|png|jpe?g|svg|webp)$/i,
          include: [
            resolve('src')
          ]
        },
        use: 'image-webpack-loader', // 是loaders的别名
        options: {
          mozjpeg: { // 压缩 jpeg 的配置
            progressive: true,
            quality: 65
          },
          optipng: { // 使用 imagemin-optipng 压缩 png，enable: false 为关闭
            enabled: false,
          },
          pngquant: { // 使用 imagemin-pngquant 压缩 png
            quality: '65-90',
            speed: 4
          },
          gifsicle: { // 压缩 gif 的配置
            interlaced: false,
          },
          webp: { // 开启 webp，会把 jpg 和 png 图片压缩为 webp 格式
            quality: 75
          }
        },
      }
    ]
  },
  performance: {
    hints:'error',
    maxEntrypointSize:400000, // 最大html + js体积
    maxAssetSize:300000    // 最大单个文件体积
  }
  

}