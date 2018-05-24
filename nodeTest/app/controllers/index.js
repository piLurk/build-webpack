//控制器
exports.index = function (req, res){
  //这里是逻辑操作，数据库操作
  res.sendFile(_dirname+'/app/views/pages/index.html')
}