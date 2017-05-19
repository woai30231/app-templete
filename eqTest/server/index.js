const http = require('http');
var express = require('express');
const querystring = require('querystring');
var app = express();
var path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname,'../')));

//定义一个函数用来请求后台接口
function getApi(options,callback,method){
    var config = {
        url: 'http://collect.sibumbg.com'+options.path,
        method: method?method:'POST',
        form:options.data,
        headers: {
            'Accept': 'application/json',
            'Content-Length':Buffer.byteLength(options.data),
            'Content-Type':'application/json;charset=utf-8'
        }
    };
    console.log(config.form);
    request(config,(err,rs,body)=>{
        callback(body);
    });
};

//请求
function _post(route){
    app.post(route,function(req,res){
        var options = {
            path : route,
            data : querystring.stringify(req.body)
        };
        getApi(options,function(data){
            res.end(data);
        });
    });
};

//请求测试分类所有题目
_post('/get_test_answers');

//请求分类测试题信息
_post('/qh_test/:id');

//请求微信接口配置权限
_post('/qh_wxchat');

//获取成绩反馈信息
_post('/qh_test_result/:id/:score');

//为测试结果添加反馈信息
_post('/qh_add_result');

//用户添加账号信息
_post('/qh_add_wx_phone');

//get请求
function _get(route){
    app.get(route,(req,res)=>{
        var options = {
            path : route
        };
        getApi(options,function(data){
            res.end(data);
        },'GET');
    });
};

//请求图片
_get('/get_img');




var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});