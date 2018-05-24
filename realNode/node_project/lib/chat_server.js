var socketio = require('socket.io')
var io,guestNumber = 1, nickNames = {}, namesUsed = [], currentRoom = {};

exports.listen = function(server) {
  io = socketio.listen(server);
  io.set('log level', 1)
  io.sockets.on('connection', function(socket){
    guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed)
    joinRoom(socket, '默认房间')
    handleMessageBroadcasting(socket, nickNames)
    handleNameChangeAttempts(socket, nickNames, namesUsed)
    handleRoomJoining(socket)
    socket.on('rooms', function(){
      socket.emit('rooms', io.of('/').adapter.rooms) //更新后的写法（而不是io.sockets.manager.rooms）
    })
    handleClientDisconnection(socket, nickNames, namesUsed)
  })
}
//分配昵称
function assignGuestName(socket, guestNumber, nickNames, namesUsed) {
  var name = 'Guest' + guestNumber;//新昵称
  nickNames[socket.id] = name;  //联系socket.id
  socket.emit('nameResult', {   //通知用户它的昵称
    success: true,
    name: name
  });
  namesUsed.push(name); //已占用昵称
  return guestNumber + 1 //计数器
}

//加入聊天室
function joinRoom(socket, room) {
  socket.join(room);  //进入房间
  currentRoom[socket.id] = room;//记录用户当前房间
  socket.emit('joinResult', {room: room}) //让用户知道他进入新房间
  socket.broadcast.to(room).emit('message', { //让房间的其他用户知道有新用户进入
    text: nickNames[socket.id] + '进入了' + room + '。'
  })
  var usersInRoom = io.of('/').in(room).clients;  //更新后的写法（而不是io.sockets.clients(room))
  if(usersInRoom.length > 1) { //如果不知一个用户在房间，汇总都是谁
    var usersInRoomSummary = '目前房间的用户有：';
    for(let i in usersInRoom){
      var userSocketId = usersInRoom[i].id;
      if(userSocketId != socket.id) {
        if(i > 0){
          usersInRoomSummary += ',';
        }
        usersInRoomSummary += nickNames[userSocketId];
      }
    }
    usersInRoomSummary += '。';
    console.log('发送信息',usersInRoomSummary)
    socket.emit('message', {text: usersInRoomSummary}) //发送汇总给用户
  }
}

//更名请求
function handleNameChangeAttempts(socket, nickNames, namesUsed) {
  socket.on('nameAttempt', function(name) {
    if(name.indexOf('Guest') == 0){
      socket.emit('nameResult', {
        success: false,
        message:'名字不能包含"Guest"。'
      })
    }else{
      if(namesUsed.indexOf(name) == -1) {
        var previousName = nickNames[socket.id];
        var previousNameIndex = namesUsed.indexOf(previousName);
        namesUsed.push(name);
        nickNames[socket.id] = name;
        delete namesUsed[previousNameIndex];
        socket.emit('nameResult', {
          success: true,
          name: name
        });
        socket.broadcast.to(currentRoom[socket.id]).emit('message', {
          text: previousName + ' 更改为 ' + name +'。'
        })

      }else {
        //用户名已经被注册
        socket.emit('nameResult', {
          success: false,
          message: '该用户名已经被注册！'
        })
      }
    }
  })
}

//发动聊天信息
function handleMessageBroadcasting(socket, nickNames){
  socket.on('message', function(message) {
    socket.broadcast.to(message.room).emit('message', {
      text: nickNames[socket.id] + ': ' + message.text
    })
  })
}

//创建房间
function handleRoomJoining(socket) {
  socket.on('join', function(room) {
    socket.leave(currentRoom[socket.id]);
    joinRoom(socket, room.newRoom)
  })
}
//用户断开连接
function handleClientDisconnection(socket, nickNames, namesUsed) {
  socket.on('disconnect', function(){
    var nameIndex = namesUsed.indexOf(nickNames[socket.id]);
    delete namesUsed[nameIndex];
    delete nickNames[socket.id];
  })
}

