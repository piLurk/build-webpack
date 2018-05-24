
//验证依赖包版本是否符合
require('./check-versions')()

const config = require('config-lite')(__dirname);

console.log(config)
//在浏览器中打开
var opn = require('opn');
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var proxyMiddleware = require('http-proxy-middleware');
var webpackConfig = require('./webpack.dev.conf');


//默认端口
var port = process.env.PORT || config.dev.port || 8080 ;

//默认路径
var host = process.env.host || config.dev.host || 'http://localhost'

//自动在浏览器开启
var autoOpenBrowser = !!config.dev.autoOpenBrowser;

//代理
var proxyTable = config.dev.proxyTable;

var app = express();
var compiler = webpack(webpackConfig);

// 开发中间件
var devMilddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiete: true
})

// 热更新
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})

//强制重新载入，当html-webpack-plugin 模板改变时
compiler.plugin('compilation', function(compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
    hotMiddleware.publish({ action: 'reload' });
    cb();
  })
})

Object.keys(proxyTable).forEach( function(context) {
  var options = proxyTable[content];
  if(typeof optoins === 'string') {
    optoins = {target: options}
  }

  app.use(proxyMiddleware(options.filter || context, options));
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

var distPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(distPath, express.static('./dist'));

var uri = host + ':' + port;

var _resolve;
var readyPromise = new Promise(resolve => {
  _resolve = resolve
});

devMilddleware.waitUntilValid( () => {
  console.log('> 开发服务器运行在： ' + uri + '\n');

  if(autoOpenBrowser) {
    opn(uri);
  }
  _resolve();
});

var server = app.listen(port);

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close();
  }
}

