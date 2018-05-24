var path = require('path');

module.exports = {
  web: {
    hosts:"dev.jiangroom.com"
  },
  build:{
    distPath: path.resolve(__dirname, '../dist')
  },
  dev:{
    port:8071,
    autoOpenBrowser:true,
    proxyTalbe:{},
    assetsPublicPath: "./",
    assetsSubDirectory: "dist"
  }
}