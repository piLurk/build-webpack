/**
 * 命令行提示
 * 
 * 
 */ 

var chalk = require('chalk')
var format = require('util').format

/**
 * Prefix 
 */ 
var prefix = '   jroom-cli'
var sep = chalk.grey('.')

/**
 * Log a message to the console
 *  
 * @param {string} message
 */ 

exports.log = function () {
  var msg = format.apply(format, arguments)
  console.log(chalk.white(prefix), sep, msg)
}

exports.fatal = function (message) {
  if(message instanceof Error) message = message.message.trim()
  var msg = format.apply(format, arguments)
  console.error(chalk.red(prefix), sep, msg)
  process.exit(1)
}

exports.success = function () {
  var msg = format.apply(format, arguments)
  console.log(chalk.white(prefix), sep, msg)
}