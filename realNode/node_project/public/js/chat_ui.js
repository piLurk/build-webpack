//可疑的文本(来自用户输入的文本，需要净化,避免XSS攻击)
function divEscaptedContentElement(message) {
  return $('<div></div>').text(message)
}

//系统生成的文本(信任文本)
function divSystemContentElement(message) {
  return $('<div></div>').html('<i>'+ message +'</i>')
}
//处理原始用户输入
function processUserInput(chatApp, socket) {
  var message = $('#send-message').val();
  var systemMessage;
  if(message.charAt(0) == '/'){ //输入以 '/'开头，视为命令
    systemMessage = chatApp.processCommand(message);
  }else {
    chatApp.sendMessage($('#room').text(), message);
    $('#messages').append(divEscaptedContentElement(message));
    $('#messages').scrollTop($('#messages').prop('scrollHeight'));
  }
  $('#send-message').val('');
}

//客户端初始化
var socket = io.connect();
$(document).ready(function() {
  var chatApp = new Chat(socket);
  socket.on('nameResult', function(result) {
    var message;

    if(result.success) {
      message = '你的用户名更改为： ' + result.name + '。'
    }else{
      message = result.message;
    }
    $('#messages').append(divSystemContentElement(message))
  })

  socket.on('joinResult', function(result) {
    $('#room').text(result.room);
    $('#messages').append(divSystemContentElement('房间改变了'))
  })

  socket.on('message', function(message) {
    var newElement = $('<div></div>').text(message.text)
    $('#messages').append(newElement)
  })

  socket.on('rooms', function(rooms) {
    $('#room-list').empty();
    for(let room in rooms){
      room = room.substring(0, room.length);
      if(room != ''){
        $('#room-list').append(divEscaptedContentElement(room))
      }
    }
    $('#room-list div').click(function() {
      chatApp.processCommand('/join' + $(this).text());
      $('#send-message').focus();

    })
  })
  setInterval(function() {
    socket.emit('rooms')
  }, 1000);

  $('#send-message').focus();

  $('#send-form').submit(function() {
    processUserInput(chatApp, socket);
    return false;
  })

})