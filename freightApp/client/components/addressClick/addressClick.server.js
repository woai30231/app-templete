"use strict";

angular.module('yfApp')
.service('addressClick',function(_address){


		// console.log(_address);
		//定义一个变量用来实现我前台地址
		var $frontAD = JSON.parse(JSON.stringify(_address));
		//是否展开列表项
		(function(){
			for(var i = 0,len = $frontAD.length;i<len;i++){
				$frontAD[i].unfold = false;
				$frontAD[i].isActive = false;
				for(var j = 0,le = $frontAD[i].areas.length;j<le;j++){
					$frontAD[i].areas[j].isActive = false;
				};
			};
		})();

		

		return{
			frontAD : $frontAD,
			spread : spread,
			shrink : shrink,
			list_click : list_click,
			childClick : childClick,
			fatherClick : fatherClick,
			btnClick : btnClick,
			stopE : stopE,
			returnAreaArr : returnAreaByCode,
			highLight : highLight,
			loseClassActive : loseClassActive

		};
		function loseClassActive(addArr){
			//首先清空所有active样式
			var arr = addArr;
			for(var i = 0,len = arr.length;i<len;i++){
				arr[i].isActive = false;
				for(var j = 0,le = arr[i].areas.length;j<le;j++){
					arr[i].areas[j].isActive = false;
				};
			};
		}
		//根据是否存在地区码，来确定是否展开地区信息和地区字体高亮状态
		function highLight(areaArr,addr){
			//当前子地区是否是选择状态
			for(var i = 0,len = areaArr.length;i<len;i++){
				for(var j = 0,le = addr.length;j<le;j++){
					if(areaArr[i] == addr[j].code){
						addr[j].isActive = true;
						for(var zz = 0,le2 = addr[j].areas.length;zz<le2;zz++){
							addr[j].areas[zz].isActive = true;
						};
						break;
					}else{
						for(var z = 0,le1 = addr[j].areas.length;z<le1;z++){
							if(areaArr[i] == addr[j].areas[z].code){
								addr[j].areas[z].isActive = true;
								break;
							};
						};
					};
				};
			};

			(function(){
				for(var i = 0,len = addr.length;i<len;i++){
					for(var j = 0,le = addr[i].areas.length;j<le;j++){
						if(addr[i].areas[j].isActive == true){
							addr[i].unfold = true;
							break;
						};
					};
				};
			})();
		};
		//根据根据地区编码，返回地区信息
		function returnAreaByCode(data){
			var areaStr = [];
			for(var i = 0,len = data.length;i<len;i++)(function(n){
				for(var j = 0,le1 = _address.length;j<le1;j++){
					if(data[i]== _address[j].code){
						areaStr.push(_address[j].name);
						break;
					}else{
						for(var z = 0,le2 = _address[j].areas.length;z<le2;z++){
							if(data[i] == _address[j].areas[z].code){
								areaStr.push(_address[j].areas[z].name);
								break;
							};
						};
					};
				}
			})(i);
			return areaStr;
		};


		function stopE(e){
			if(e.stopPropagation){
				e.stopPropagation();
			};
		};
		function btnClick(e){
			var $dom = $(e.currentTarget);
			var $parent = $dom.parent().parent();
			//判断一下子选项是否可见
			if($parent.find('.ADDR__child').is(":visible")){
				spread($parent,'.ADDR__child');
				$dom.addClass('active');
			}else{
				shrink($parent,'.ADDR__child');			
				$dom.removeClass('active');
			};
			stopE(e);
		};
		function fatherClick(e){
			var $dom = $(e.currentTarget);
			// console.log(e);
			//更改样式
			var isActive = list_click($dom,'active');
			var $parent = $dom.parent();
			if(isActive){			
				$parent.find('.ADDR__child .ADDR__item').addClass('active');
			}else{			
				$parent.find('.ADDR__child .ADDR__item').removeClass('active');
			};
			stopE(e);
		};
		function childClick(e){
			var $dom = $(e.currentTarget);
			//更改样式
			var isActive = list_click($dom,'active');
			//获取父节点
			var $parent = $dom.parent();
			//获取父父节点
			var $Parent = $dom.parent().parent();
			//是否去除地区节点的选取
			var isIfLoseArea = true;
			$parent.children('.ADDR__item').each(function(){
				if(!$(this).hasClass('active')){
					isIfLoseArea = false;
				};
			});

			if(!isIfLoseArea){
				$Parent.children('.ADDR__item_main').removeClass('active');
			}else{
				$Parent.children('.ADDR__item_main').addClass('active');
			};
			stopE(e);
		};
		//展开
		function spread(dom,_class){
			dom.children(_class).slideUp();
		};

		//搜索
		function shrink(dom,_class){
			dom.children(_class).slideDown();
		};




		function list_click(dom,_class){
			var isHasActive = dom.hasClass(_class);
			//是否出于被激活状态
			var isActive = false;
			if(isHasActive){
				dom.removeClass(_class);
			}else{
				dom.addClass(_class);
				isActive = true;
			};
			return isActive;
		};

});