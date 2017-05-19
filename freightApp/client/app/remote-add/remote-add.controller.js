"use strict";

angular.module('yfApp')
.controller('RemoteaddController',function(addressClick,$stateParams,$state,apiUri,maskLayout,$timeout,newTk){
	var re = this;
	//获取模板id
	re.modelId = $stateParams.modelId;
	function goHome(){
		$state.go('freight');
		maskLayout.tipsShow('请您选择运费模板！');
		$timeout(function(){
			maskLayout.tipsHide();
		},2000);
	};
	!re.modelId?goHome():'';
	//获取模板name
	re.modelName = $stateParams.modelName;
	re.frontAD = addressClick.frontAD;
	re.childClick = addressClick.childClick;
	re.fatherClick = addressClick.fatherClick;
	re.btnClick = addressClick.btnClick;


	//收费类型id
	re.chargeId;
	//包邮地区字符串
	re.areaStr = '偏远地区:';
	//包邮地区编码数组
	re.areaCodeArr = null;

	//获取免邮模板
	re.getModelById = function(id){
		apiUri.get({
			url:apiUri.url.freightTemplate_getFreeTemplate_url+'?id='+id,
			success : function(data){
				if(!data.result || data.result.area.length<=0)return;
				re.chargeId = data.result.id;
				re.areaStr += addressClick.returnAreaArr(data.result.area);
				console.log(data.result.area);
				re.areaCodeArr = data.result.area;
				addressClick.highLight(data.result.area,re.frontAD);
			},
			error : function(data){
				$state.go('freight');
				newTk.show(data.errorMsg,1500);
			}
		});
	};
	re.getModelById(re.modelId);
	//修改免邮模板
	re._dis = false;
	re.exChange = function(e){
		re._dis = true;
		addressClick.loseClassActive(re.frontAD);
		$("#AD1 .ADDR").each(function(){
			var $dom = $(this);
			$dom.find('.ADDR__item_main').removeClass('active');
			$dom.find('.ADDR__child').children('.ADDR__item').each(function(){
				$(this).removeClass('active');
			});
		});
		$timeout(function(){
			addressClick.highLight(re.areaCodeArr,re.frontAD);
		},0);
		addressClick.stopE(e);
	};
	//关闭弹框
	re.closeTk = function(e){
		re._dis = false;
		addressClick.stopE(e);
	};

	re.postModel = function postModel(e){
		re._dis = false;
		var arr = [];
		$("#AD1 .ADDR").each(function(){
			var $dom = $(this);
			//第一个子节点
			var $firstDom = $dom.find('.ADDR__item_main');
			//第二个子节点
			var $secondDom = $dom.find('.ADDR__child');
			if($firstDom.hasClass('active')){
				arr.push($firstDom.attr('origin-id'));
			}else{
				$secondDom.children('.ADDR__item').each(function(){
					var $this = $(this);
					if($this.hasClass('active')){
						arr.push($this.attr('origin-id'));
					};
				});
			};
		});
		arr = arr.join(',');
		console.log(arr);
		apiUri.post({
			url:apiUri.url.freightTemplate_updateFreeTemplate_url,
			data : {
				detailId:re.chargeId,
				area:arr
			},
			success :function(data){
				maskLayout.tipsShow('更新成功！');
				$state.reload();
				$timeout(function(){
					maskLayout.tipsHide();
				},2000);
			},
			error :function(data){
				console.log(data);
				newTk.show(data.errorMsg,1500);
			}
		});
		// re.getModelById(re.modelId);
		addressClick.stopE(e);
	};
});