const http = require('http');
const querystring = require('querystring');
const request = require('request');
const bodyParser = require('body-parser');

module.exports = function(app){
  var env = app.get('env');


  	function http_post(url,data,callback){
  		var get_query = querystring.stringify(data);
  		// var get_query = JSON.stringify(data);
  		var req = http.request({
		  hostname: 'testseller.mall.doubozhibo.com',
		  port: 80,
		  path:'/api/'+url,
		  method: 'POST',
		  headers: {
		      'Content-Type': 'application/json;charset=UTF-8',
			   'Cookie':'web.mid=f7d475a83ae84eb988f1404fcbf33d9c'
		  }
		},(res)=>{
			res.setEncoding('utf8');
			res.on('data', (chunk) => {
				data = chunk;
				callback(data);
			});
		});
		req.write(get_query);
		req.end();
  	};

  	function post1(route){
  		app.post(route,function(req,res){
  			console.log(req.body);
  			http_post(route,req.body,(data)=>{
  				// console.log(data);
  				res.end(data);
  			});
  		});	
  	};

  	function post2(route){
  		app.post(route,(req,res)=>{
  				var _data = req.body;
  				bodyParser.json(_data);
  				console.log(_data);
  			http_post(route,_data,(data)=>{
  				// console.log(data);
  				res.end(data);
  			});
  		});
  	};

  	//更新免邮模板
  	post1('/freightTemplate/updateFreeTemplate');

  	//更新运费模板
  	post2('/freightTemplate/updateTemplate');

  	//新建运费模板
  	post2('/freightTemplate/addTemplate');

	//请求api接口数据
	function http_api(method,options,callback){
		//get方法请求参数
		let get_query = querystring.stringify(options.queryData);
		//返回的数据
		let data = '';
		let req = http.request({
			  hostname: 'testseller.mall.doubozhibo.com',
			  // hostname: '192.168.130.29',//邱景旺本地
			  port: 80,
			  path: '/api/'+ options.url,
			  method: method,
			  headers: {
			    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			    // 'Content-Type': 'application/json;charset=UTF-8',
			    'Content-Length': Buffer.byteLength(get_query),
			    'Cookie':'web.mid=f7d475a83ae84eb988f1404fcbf33d9c'
			  }
		},(res)=>{
			res.setEncoding('utf8');
			res.on('data', (chunk) => {
				data += chunk;
			});
			res.on('end', () => {
				// JSON.parse(data);
				if(callback){
					callback(data);
				};
			});
		});
		req.write(get_query);
		req.end();
	};

	function get1(route){
		app.get(route,function(req,res){
		  	http_api('get',{
		  		url :  req.url,
		  		queryData  : req.query
		  	},(data)=>{
		  		res.end(data);
		  	});

		  });
	};


  //分页获取运费模板
	get1('/freightTemplate/page');

	//获取免邮模板
	get1('/freightTemplate/getFreeTemplate');

	//获取运费模板
	get1('/freightTemplate/getTemplate');

	//删除子模块根据id
	get1('/freightTemplate/deleteDetail');

	//删除运费模板
	get1('/freightTemplate/deleteTemplate');




};