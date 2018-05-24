var http = require('http')
var fs = require('fs')
var path = require('path')
var mime = require('mime')
var chatServer = require('./lib/chat_server')
var cache = {}

function send404(res){
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.write('Error 404: res not found')
  res.end()
}
function sendFile(res, filePath, fileContents){
  res.writeHead(
    200,
    {'Content-Type': mime.getType(path.basename(filePath))}
  )
  res.end(fileContents);
}

//文件是否在内存中
function serveStatic(res, cache, absPath) {
  if(cache[absPath]){
    //在缓存中
    sendFile(res, absPath, cache[absPath])
  }else{
    fs.exists(absPath, function(exists) {
      //文件是否存在
      if(exists) {
        fs.readFile(absPath, function(err, data) {
          if(err){
            send404(res)
          }else{
            cache[absPath] = data;
            sendFile(res, absPath, data);
          }
        })
      }else{
        send404(res)
      }
    })
  }
}

var server = http.createServer(function(req, res){
  var filePath = false;
  if(req.url == '/'){
    filePath = 'public/index.html'
  }else{
    filePath = 'public' + req.url
  }
  var absPath = './' +filePath;
  serveStatic(res, cache, absPath)
})

server.listen(3000, function(){
  console.log('服务器真在3000端口运行！')
})
chatServer.listen(server)
