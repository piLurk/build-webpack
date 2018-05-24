#!/usr/bin/env node

var logger = require('../lib/logger')
var request = require('request')
var chalk = require('chalk')

console.log()
process.on('exit', function(){
  console.log()
})

