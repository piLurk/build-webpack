var http = require('http')
var fs = require('fs')
var querystring = require('querystring')
var util = require('util')
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();
console.log(process.argv)



http.createServer( function (req, res) {
  var post = "";
  req.on("data", function(chunk){
    post += chunk
  })
  req.on("end",function(){
    post = querystring.parse(post)
    res.end(util.inspect(post))
  })
  // fs.readFile('file/test.txt', 'utf-8', function(err, data) {
  //   if(err){
  //     console.log('err')
  //   }else{
  //     res.writeHead(200, {"Content-Type": "text/html"});
  //     res.write('<h1>this is NODE</h1>');
  //     res.write('<div>'+ data +'</div>');
  //     res.end('<p>hello world</p>')
  //   }
  // })

  event.on('some_event', function(){
    console.log('推送的事件执行了')
  })
  setTimeout(() => {
    event.emit('some_event')
  }, 3000);

  
}).listen(8000)
console.log('服务正在运行在8000端口')