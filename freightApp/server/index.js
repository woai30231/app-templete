
// import http from 'http';
// Set default node environment to development
// var sbDatabase = require('./url');
// console.log(sbDatabase);
process.env.NODE_ENV = process.env.NODE_ENV || 'angular';
const http = require('http');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path')
app.use( bodyParser.urlencoded({ extended:false }) )
app.use( bodyParser.json() )
var env = app.get('env');
// console.log(env);
var port = env == 'angular' ? 10238 : 10222;
app.use(express.static(path.join(__dirname,'../')));
require('./router')(app)

app.all('*', function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "DNT,X-Mx-ReqToken,Keep-alive,User-Agent,X-Requested-With,content-type,Authorization,x-access-token");
      res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS,PATCH");
      next();
  });

app.listen(port,function(){
	console.log('启动在的文件夹 '+env+' 监听端口 '+port)
});


