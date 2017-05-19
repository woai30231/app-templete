"use strict";

angular.module('yfApp')
.controller('YfmodelController',function(addressClick,dialog,$stateParams,apiUri,$state,$timeout,maskLayout,newTk){
	var yf = this;
	// console.log($stateParams);
	//tk是否显示
	yf._dis = false;
	yf.frontAD = addressClick.frontAD;
	yf.childClick = addressClick.childClick;
	yf.fatherClick = addressClick.fatherClick;
	yf.btnClick = addressClick.btnClick;

	yf.getNewModel = $stateParams.getNewModel;



	//店铺id
	yf.shopId = $stateParams.shopId;

	yf.modelId = $stateParams.modelId;
	!(yf.modelId || yf.getNewModel)?(function(){
		$state.go('freight');
		maskLayout.tipsShow('请选择模板！');
		$timeout(function(){
			maskLayout.tipsHide();
		},2000);
	})():'';
	yf.modelName = $stateParams.modelName;

	yf.originModel = null;
	yf.model = null;
	yf.freightTemplateId = undefined;


	//当前修改子运费模板id
	yf.currentModelId;
	//新增子运费模板.id
	yf.newModelId = 0;
	//当前新增子运费模板id
	yf.currentNewModelId;

	yf.getModel = function(id){
		apiUri.get({
			url:apiUri.url.freightTemplate_getTemplate_url + '?id=' +id,
			success : function(data){
				if(!data.result)return;
				yf.originModel = data.result;
				yf.model = JSON.parse(JSON.stringify(data.result));
				yf.freightTemplateId = yf.model.id;
				getAreaStr();
			},
			error:function(data){
				newTk.show(data.errorMsg,1500);
			}
		})
	};
	//如果id为空不请求后台接口
	yf.modelId?yf.getModel(yf.modelId):'';

	//新建运费模板
	(function(){
		if(!yf.getNewModel)return;
		yf.model = {
		    shopId: yf.shopId,
		    name: "",
		    type: 1,
		    detailList: [
		      {
		        area: null,
		        firstNum: 0,
		        firstFreight: 0,
		        continuedNum: 0,
		        continuedFreight: 0,
		        isDefault: 1
		      }

		    ]
		  };
	})();

	//修改子订单区域名字
	yf.changeChildModelArea = function changeChildModelArea(obj){
		
		var id = obj.id;
		var newModelId = obj.newModelId;
		yf.currentNewModelId = obj.newModelId;
		addressClick.loseClassActive(yf.frontAD);
		yf.currentModelId = id;
		$("#AD2 .ADDR").each(function(){
			var $dom = $(this);
			$dom.find('.ADDR__item_main').removeClass('active');
			$dom.find('.ADDR__child').children('.ADDR__item').each(function(){
				$(this).removeClass('active');
			});
		});
		yf._dis = true;
		// console.log(yf.model);
		// console.log(yf.frontAD);
		// return;
		var mo = yf.model.detailList;
		if(id){
			$timeout(function(){
				for(var i = 0,len = mo.length;i<len;i++){
					if(id == mo[i].id){
						addressClick.highLight(mo[i].area,yf.frontAD);
						break;
					};
				};
				// console.log(yf.model);
				// console.log(yf.frontAD);
			},0);

			return;
		};
		$timeout(function(){
			// console.log('到这里了吗');
			for(var i = 0,len = mo.length;i<len;i++){
					if(newModelId == mo[i].newModelId){
						// console.log('这里呢');
						addressClick.highLight(mo[i].area,yf.frontAD);
						break;
					};
			};
			// console.log(yf.model);
			// console.log(yf.frontAD);
		},0);	
			
	};

	//更新区域名字
	yf.updateAreaStr = function(){
		// console.log(yf.currentModelId);
		var id = yf.currentModelId;
		var arr = [];
		$("#AD2 .ADDR").each(function(){
			var $dom = $(this);
			var $firstChild = $dom.find('.ADDR__item_main');
			var $secondChild = $dom.find('.ADDR__child');
			if($firstChild.hasClass('active')){
				arr.push($firstChild.attr('origin-id'));
			}else{
				$secondChild.find('.ADDR__item').each(function(){
					if($(this).hasClass('active')){
						arr.push($(this).attr('origin-id'));
					};
				});
			};
		});
		yf._dis = false;
		var mo = yf.model.detailList;
		if(!id){
			for(var i = 0,len = mo.length;i<len;i++){
				if(yf.currentNewModelId == mo[i].newModelId){
					mo[i].area = arr;
					mo[i].areaStr = addressClick.returnAreaArr(yf.model.detailList[i].area).join(',');
					break;
				};
			};
			return;
		};
		
		for(var i = 0,len = mo.length;i<len;i++){
			if(id == mo[i].id){
				mo[i].area = arr;
				mo[i].areaStr = addressClick.returnAreaArr(yf.model.detailList[i].area).join(',');
				break;
			};
		};
	};


	function getAreaStr(){
		for(var i = 0,len = yf.model.detailList.length;i<len;i++){
			var str = '';
			str += addressClick.returnAreaArr(yf.model.detailList[i].area).join(',');
			yf.model.detailList[i].areaStr = str;
		};
	};

	//删除模板子区域
	yf.removeChildModel = function(obj){
		console.log(obj);
		var id = obj.id;
		var newModelId = obj.newModelId;
		var mo = yf.model.detailList;
		if(!id){
			for(var i = 0,len = mo.length;i<len;i++){
				if(newModelId == mo[i].newModelId){
					mo.splice(i,1);
					break;
				};
			};
			return;
		};
		apiUri.get({
			url:apiUri.url.freightTemplate_deleteDetail_url + '?id='+id,
			success : function(data){
				// $state.reload();
				yf.upDateModel(id);
				maskLayout.tipsShow('删除成功！');
				$timeout(function(){
					maskLayout.tipsHide();
				},2000);
			},
			error:function(data){
				newTk.show(data.errorMsg,1500);
			}
		});
	};


	//添加运费模板
	yf.adChildModel = function(){
		var mo = yf.model;
		var list = mo.detailList;
		var obj = {};
		obj.isDefault = 0;
		obj.areaStr = '';
		obj.area = [];
		obj.firstNum;
		obj.firstFreight;
		obj.continuedNum;
		obj.id = null;
		obj.freightTemplateId = yf.freightTemplateId;
		obj.continuedFreight;
		obj.newModelId = yf.newModelId
		list.push(obj);
		yf.newModelId++;
	};


	//更新运费模板
	yf.uModel = function(){

		var data = JSON.parse(JSON.stringify(yf.model));
		delete data.shopId;
		for(var i = 0,len = data.detailList.length;i<len;i++){
			delete data.detailList[i].areaStr;
			delete data.detailList[i].newModelId;
			data.detailList[i] = JSON.parse(JSON.stringify(data.detailList[i]));
		};
		apiUri.post({
			url:apiUri.url.freightTemplate_updateTemplate_url,
			data:data,
			success : function(){
				newTk.show('更新成功！',1500);
				$state.go('freight');
			},
			error : function(){
				newTk.show('请稍后尝试或检查参数是否有误！',1500);
			}
		});
	};


	//添加新运费模板
	yf.addNewModel = function(){
		var data = JSON.parse(JSON.stringify(yf.model));
		delete data.shopId;
		for(var i = 0,len = data.detailList.length;i<len;i++){
			delete data.detailList[i].areaStr;
			delete data.detailList[i].newModelId;
			delete data.detailList[i].freightTemplateId;
			delete data.detailList[i].id;
			data.detailList[i] = JSON.parse(JSON.stringify(data.detailList[i]));
		};
		apiUri.post({
			url:apiUri.url.freightTemplate_addTemplate_url,
			data:data,
			success : function(){
				newTk.show('新建成功！',1500);
				$state.go('freight');
			},
			error : function(data){
				newTk.show(data.errorMsg,1500);
			}
		});
	};


	//删除运费模板
	yf.deleteModel = function(id){
		dialog.show(function(){
			console.log('你确定？');
			fn(id);
		});
		return;
		function fn(id){
			apiUri.get({
				url:apiUri.url.freightTemplate_deleteTemplate_url + '?id='+id,
				success : function(data){
					maskLayout.tipsShow('删除成功！');
					$state.go('freight');
					$timeout(function(){
						maskLayout.tipsHide();
					},2000);
				},
				error: function(data){
					newTk.show(data.errorMsg,1500)
				}
			});
		};
	};
		
	//更新数组，
	yf.upDateModel = function(id){
		for(var i = 0,len = yf.model.detailList.length;i<len;i++){
			if(id == yf.model.detailList[i].id){
				yf.model.detailList.splice(i,1);
			};
		};
	};


});