var express = require('express')
var path = require('path')
var fs = require('fs')
var serveStatic = require('serve-static')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
//全局变量，全局可以访问
_dirname=path.resolve();
var app = express()
const port = 8088;


app.use(serveStatic('./app/static'))

require('./app/route/routes')(app)

app.listen(port,function (req,res) {
	console.log("服务器正在"+port+"端口运行");
})

