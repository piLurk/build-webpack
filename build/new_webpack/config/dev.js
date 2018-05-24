var path = require('path');

module.exports = {
  web: {
    host:"dev.jiangroom.com",
  },
  build:{
    distPath: path.resolve(__dirname, '../dist')
  },
  dev:{
    port:8072,
    autoOpenBrowser:true,
    proxyTalbe:{},
    assetsPublicPath: "./",
    assetsSubDirectory: "dist"
  }
}