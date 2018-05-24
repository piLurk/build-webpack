
// var path = require('path')
// const _config = (() => {
//   switch (process.env.NODE_ENV) {
//     case 'development':
//       return path.resolve(__dirname, 'config/config.dev.js')
//     case 'production':
//       return path.resolve(__dirname, 'config/config.prod.js')
//     default:
//       return path.resolve(__dirname, `config/config.${process.env.NODE_ENV}.test.js`)
//     // case 'local':
//     //   return path.resolve(__dirname, 'config/config.local.test.js')
//   }
// })()
module.exports = {
  build:{
    analyze:true, //可视化分析打包后的文件
    // babel:['vue-app'], //babel配置
    extend(config, {isClient}) {
      if(isClient) {
        //为客户端打包
        config.devtool = 'eval-source-map'
        //config.global_config = _config
      }
    }

  },
  performance:{
    prefetch:false, //预加载
    gizp:true  // gizp压缩
  }

}