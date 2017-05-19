"use strict";


angular.module('yfApp')
.service('apiUri',function($location,maskLayout,$http,$timeout){
	//api服务器地址apiServerAddress，简写为aSD
	var aSD = '';
	//相对服务器地址relationAddress，简写为rA
	var rA = '';
	//如果是本地开发，那么aSD则是服务器完全地址
	//rD为空
	//如果是正式地址，那么aSD则是空
	//rD的值相对于接口目录地址值
	//定义一个变量用于获取是否本地开发
	var isLocalhost = true;
	var apiA = undefined;
	if(/localhost:10238/gi.test($location.$$host+':'+$location.$$port)){
		aSD = 'http://120.76.25.187:8080/cms-sys/api';
		rA = '';
		apiA = 'http://testseller.mall.doubozhibo.com/api';
		isLocalhost = true;
	}else{
		//此时都为空，
		//倒是对接一下，填这里
		aSD = '';
		rA = '';
		apiA = '';
		isLocalhost = false;
	};
	// maskLayout.tipsShow();
	// console.log(apiA);
	var url = {
		'freightTemplate_page_url':isLocalhost?'/freightTemplate/page':"/shipping/freight-template",//分页获取运费模板
		'freightTemplate_getFreeTemplate_url':isLocalhost?'/freightTemplate/getFreeTemplate':"/shipping/get-free-template",//分页免邮模板
		'freightTemplate_updateFreeTemplate_url':isLocalhost?'/freightTemplate/updateFreeTemplate':"/shipping/update-free-template",//更新免邮模板
		'freightTemplate_getTemplate_url': isLocalhost?'/freightTemplate/getTemplate':"/shipping/get-template",//获取邮费模板
		'freightTemplate_deleteDetail_url':isLocalhost?'/freightTemplate/deleteDetail':"/shipping/delete-detail",//获取邮费子模板区域
		'freightTemplate_updateTemplate_url':isLocalhost?'/freightTemplate/updateTemplate':"/shipping/update-template",//更新邮费模板
		'freightTemplate_deleteTemplate_url':isLocalhost?'/freightTemplate/deleteTemplate':"/shipping/delete-template",//删除运费模板
		'freightTemplate_addTemplate_url':isLocalhost?'/freightTemplate/addTemplate':"/shipping/add-template"//新建运费模板
	};
	// console.log(url);
	return {
		//API接口地址
		url:url,
		//请求方法：get
		get : get ,
		//请求方法：post
		post : post
	};

	function get(config){
		maskLayout.processShow();
		$http.get(config.url).success(function(data){
			maskLayout.processHide();
			// JSON.parse(data);
			if(data.errorCode == 0){
				if(config.success){
		          config.success.call(this,data);
		        };
			}else{
				if(config.error){
					config.error.call(this,data);
				}else{
					maskLayout.tipsShow('请稍后尝试！');
					$timeout(function(){
						maskLayout.tipsHide();
					},3000);
				};
			};
		});
	};
	function post(config){
		maskLayout.processShow();
		$http.post(config.url,config.data).success(function(data){
			maskLayout.processHide();
			if(data.errorCode == 0){
				if(config.success){
		          config.success.call(this,data);
		        };
			}else{
				if(config.error){
					config.error.call(this,data);
				}else{
					maskLayout.tipsShow('请稍后尝试！');
					$timeout(function(){
						maskLayout.tipsHide();
					},3000);
				};
			};
		});
	};

});