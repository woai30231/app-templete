
const http = require('http');
const querystring = require('querystring');
var fs = require("fs");
var request = require("request");
// 172.16.0.74
const api={
  DOMAIN: 'testxws.sibumbg.com', //'localhost',
	PORT: 80, //9092,
	PATH:'/api'
};
/*代理请求qixin app接口 2017-04-17 start*/
// const api = {
//   DOMAIN : '120.76.25.187',
//   PORT : '8080',
//   PATH: '/cms-sys/api'
// };
/*代理请求qixin app接口 2017-04-17 end*/
function http_curl (config,params,callback){
	var data = '';
	var req = http.request(config,function(res){
    res.setEncoding('utf8');
		var token = res.headers['token']
		var cookie = res.headers['set-cookie']
  		res.on('data', function (chunk) {
  			data += chunk;
  		}).on('end',function(chunk){
        // console.log(chunk);
  			if(!data){
  				data = {code:-1,message:"抓取数据失败"}
	  			if(callback) callback.call(this,data);
	  			return;
  			};
  			data = JSON.parse(data);
  			if(token){
  				data.token = token;
  			}
  			if(cookie){
  				data.cookie = cookie.toString()
  			}
  			if(callback) callback.call(this,data);
  		})
	});
	req.on('error',function(err){
    console.log(err.message);
		data = {code:-1,message:'请求失败，请重试',data:[]}
		if(callback) callback.call(this,data)
	});
	req.write(params);
	req.end();
}


function paramsUri(params){
	if(typeof params == 'function'){
		params = querystring.stringify({
			'platform':1
		})
    // console.log(params);
	}else{
		params.platform=1;
		params = querystring.stringify(params);
    // console.log(params+"hahah ");
	}
	return params;
}
function paramsForm(params){
	var obj = {};
	var form = new FormData();
	for (var key in params){
		form.append(key,params[key])
	}
	return form;
}

function jsonString(params){
	params = querystring.stringify(params);
  // console.log(params+"123456");
	return params
}

exports.post = function(path,params,callback,cookie){

	if(typeof params == 'function'){
		callback = params;	
		params = {};
	}
	params = jsonString(params)
  var config = {
		hostname: api.DOMAIN,
  		port: api.PORT,
  		path:  api.PATH+path+'?'+paramsUri({}),
  		method: 'POST',
  		headers: {
        'Cookie' : cookie || '',
    		'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    		'Content-Length': params.length
  		}
	};
	http_curl(config,params,callback);
};
//changes by feng
exports.post1 = function(path,params,callback,cookie,token){
  if(typeof params == 'function'){
    callback = params;
    params = {};
  };
  params = querystring.stringify(params);
  // console.log(params);
  var config = {
    hostname:api.DOMAIN,
    port:api.PORT,
    path:api.PATH+path,
    method:'POST',
    headers:{
      'Cookie' : cookie || '',
      'token' : token || '',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  };
  http_curl(config,params,callback);
};
//changes by feng
exports.post_json = function(path,params,callback,cookie,token){
  var config = {
    hostname: api.DOMAIN,
    port: api.PORT,
    path:  api.PATH+path+'?'+paramsUri({}),
    method: 'POST',
    headers: {
      'Cookie' : cookie || '',
      'token'  : token || '',
      'Content-Type': 'application/json'
    }
  }
  var data = '';
  var req = http.request(config,function(res){
    res.setEncoding('utf8');
      res.on('data', function (chunk) {
        data += chunk;
      }).on('end',function(chunk){
        if(!data){
          data = {code:-1,message:"抓取数据失败"}
          if(callback) callback.call(this,data);
          return;
        }
        data = JSON.parse(data);
        if(callback) callback.call(this,data);
      })
  });
  req.on('error',function(){
    data = {code:-1,message:'请求失败，请重试',data:[]}
    if(callback) callback.call(this,data)
  })
  req.write(JSON.stringify(params))
  req.end();
}
exports.post_form = function(path,params,callback,cookie,token){
	if(typeof params == 'function'){
		callback = params;	
		params = {};
	}
  // console.log(callback);
	params = paramsUri(params)
	var config = {
		hostname: api.DOMAIN,
  		port: api.PORT,
  		path:  api.PATH+path+'?'+paramsUri({}),
  		method: 'POST',
  		headers: {
        'Cookie' : cookie || '',
        'token'  : token || '',
    		'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    		'Content-Length': params.length
  		}
	}

	http_curl(config,params,callback);
}
exports.get=function(path,params,callback,cookie,token){
  // console.log(cookie);
  // console.log(path);
	if(typeof params == 'function'){
		cookie = callback;
		callback = params;	
	}
	params = paramsUri(params);
	var config = {
		hostname: api.DOMAIN,
  		port: api.PORT,
  		path: api.PATH+path+'?'+params,
  		method: 'GET',
  		headers: {
  			'Cookie' : cookie || '',
        'token'  : token || '',
    		'Content-Type': 'application/json',
    		'Content-Length': params.length
  		}
	}
	http_curl(config,params,callback);
};
exports.get_feng = function(path,params,callback,cookie,token){
  params = querystring.stringify(params);
  var config = {
    hostname : api.DOMAIN,
    port:api.PORT,
    path:api.PATH+path,
    method:'GET',
    headers:{
      'Cookie':cookie||'',
      'token':token||'',
      'Content-Type':'application/json'
    }
  };
  http_curl(config,params,callback);
};
exports.image = function(path,files,callback,cookie,token){
  var fs = require("fs");
  var request = require("request");

  var options = { method: 'POST',
    url: 'http://testxws.sibumbg.com/api/file/fdfsUpload',
    headers: 
     { 'postman-token': 'bca155a2-dad9-21dd-f7ed-606de3257e8a',
       'cache-control': 'no-cache',
       'content-type': 'multipart/form-data; boundary=---011000010111000001101001' },
    formData: 
     { attachs: 
        { value: 'fs.createReadStream("[object Object]")',
          options: { filename: { '0': {} }, contentType: null } } } };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    res.json({
        "code":0,
        "message":"获取数据成功",
        "data":{
          "name":"1.jpg",
          "size":189330,
          "url":"http://120.25.75.47:8090/group1/M00/00/01/eBlLL1eHLP6AIFIZAALjkgVl21w525.jpg","type":"jpg"
        }
    })
    // console.log(body);
  });

  // console.log('http://'+api.DOMAIN+api.PATH+path)
  // var options = { method: 'POST',
  //   url: 'http://'+api.DOMAIN+api.PATH+path,
  //   formData:{ 
  //     attachs:{ 
  //       value: 'fs.createReadStream("[object Object]")',
  //       options: { filename: { '0': {} }, contentType: null } 
  //     } 
  //   } 
  // };
  // request(options, function (error, response, body) {
  //   if (error) throw new Error(error);

  //   console.log(body);
  //   callback.call(this,body);
  // });
}



