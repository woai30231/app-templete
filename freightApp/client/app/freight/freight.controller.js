"use strict";

angular.module('yfApp')
.controller('FreightController',function(apiUri,_address,addressClick,$stateParams){
	var freight = this;


	//非偏远地区免邮模板
	freight.freeModel = [];
	//默认运费模板
	freight.defaultModel = [];
	//自定义模板
	freight.commonModel = [];


	//获取分页邮费模板
	(function(){


		var model = [];
		var currentPage = 1;
		var isLoad = false;
		var isLoadMore = true;
		freight.getModel = function(){
			if(isLoad || !isLoadMore)return;
			isLoad = true;
			apiUri.get({
				url: apiUri.url.freightTemplate_page_url+'?&page.pageSize=20&page.currentPage='+currentPage,
				success : function(data){
					if(!data.result || data.result.data.length <= 0)return;
					var dataArr = data.result.data;
					//模板
					model = model.concat(dataArr);
					addModelByType(dataArr);				
					currentPage++;
					if(currentPage > data.result.totalPage){
						isLoadMore = false;
						return;
					};
				},
				error : function(data){
					// console.log(data);
				}
			});
		};
		freight.getModel();

		//根据模板类型，添加到对应模板中
		function addModelByType(data){
			for(var i = 0,len = data.length;i<len;i++){
				if(data[i].type == 3){
					freight.freeModel = freight.freeModel.concat(data[i]);
				}else if(data[i].type == 2){
					freight.defaultModel = freight.defaultModel.concat(data[i]);
				}else if(data[i].type == 1){
					freight.commonModel = freight.commonModel.concat(data[i]);
				}else{
					continue;
				};
			};
			returnRreeStr();
			returnDefaultStr();
			returnDefaultStr();
		};

		//添加包邮模板地区字符串
		function returnRreeStr(){
			var arr = freight.freeModel;
			for(var i = 0,len = arr.length;i<len;i++)(function(n){
				for(var j = 0,le1 = arr[i].detailList.length;j<le1;j++){
					arr[i].detailList[j].areaStr ='非偏远地区:' + addressClick.returnAreaArr(arr[i].detailList[j].area).join('，');					
				};
			})(i);
		};
		//添加默认运费模板地区字符串
		function returnDefaultStr(){
			var arr = freight.defaultModel;
			for(var i = 0,len = arr.length;i<len;i++)(function(n){
				for(var j = 0,le1 = arr[i].detailList.length;j<le1;j++){
					arr[i].detailList[j].areaStr ='指定地区收费:' + addressClick.returnAreaArr(arr[i].detailList[j].area).join('，');					
				};
			})(i);
		};

		//添加自定义运费模板地区字符串
		function returnDefaultStr(){
			var arr = freight.commonModel;
			for(var i = 0,len = arr.length;i<len;i++)(function(n){
				for(var j = 0,le1 = arr[i].detailList.length;j<le1;j++){
					arr[i].detailList[j].areaStr ='指定地区收费:' + addressClick.returnAreaArr(arr[i].detailList[j].area).join('，');					
				};
			})(i);
		};


		



	})();
});