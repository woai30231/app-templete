'use strict';

angular.module('yfApp')
.factory('maskLayout',function($document,$timeout){
	var tipsDom = null;
	var processDom = null;
	var doc = $document[0].body || $document[0].documentElement;
	var cssObj = {
			position:'fixed',
			left:'50%',
			top:'50%',
			'WebkitTransform':'translate(-50%,-50%)',
			'MozTransform':'translate(-50%,-50%)',
			'MsTransform':'translate(-50%,-50%)',
			'OTransform':'translate(-50%,-50%)',
			'transform':'translate(-50%,-50%)',
			'WebkitTransition':'opacity 0.3s ease-in',
			'MozTransition':'opacity 0.3s ease-in',
			'MsTransition':'opacity 0.3s ease-in',
			'OTransition':'opacity 0.3s ease-in',
			'transition':'opacity 0.3s ease-in',
			backgroundColor:'rgba(0,0,0,0.6)',
			'WebkitBorderRadius':'0.08rem',
			'MozBorderRadius':'0.08rem',
			'borderRadius':'0.08rem',
			color:'#fff',
			textAlign:'center',
			padding:'40px 8px',
			fontSize:'0.24rem',
			lineHeight:'1.4',
			width:'80%',
			zIndex:'99',
			maxWidth:'280px'
		};
	preview();
	return {
		//提示显示
		tipsShow: tipsShow,
		//提示隐藏
		tipsHide  : tipsHide,
		//进度条显示
		processShow : processShow,
		//进度条隐藏
		processHide : processHide
	};
	function tipsShow(str){
		if(!tipsDom){
			tipsDom = document.createElement('div');
			for(var pro in cssObj){
				tipsDom.style[pro] = cssObj[pro];
			};
			doc.appendChild(tipsDom);
			tipsDom.innerHTML = '你已经操作成功！';
		};
		tipsDom.style.display = 'block';
		tipsDom.style.opacity = 1;
		tipsDom.style.filter = 'alpha(opacity=100)';
		tipsDom.innerHTML = str?str:'你已经操作成功！';
	};
	function tipsHide(){
		if(tipsDom){
			tipsDom.offsetWidth;
			tipsDom.style.opacity = 0;
			tipsDom.style.filter = 'alpha(opacity=0)';
			$timeout(function(){
				tipsDom.style.display = 'none';
			},300);
		};
	};
	function processShow(str){
		if(!processDom){
			processDom = document.createElement('div');
			for(var pro in cssObj){
				processDom.style[pro] = cssObj[pro];
			};
			doc.appendChild(processDom);
			processDom.innerHTML = '<img src="./images/vote_search-icon5.gif" style="display:block;width:0.32rem;height:0.32rem;margin:0px auto;margin-bottom:8px;"/>\n'+
			'<span id="processText">正在加载中...</span>';
		};
		processDom.style.display = 'block';
		processDom.style.opacity = 1;
		processDom.style.filter = 'alpha(opacity=100)';
		angular.element(processDom).has('#processText').text(str?str:'正在加载中...');
	};
	function processHide(){
		if(processDom){
			processDom.offsetWidth;
			processDom.style.opacity = 0;
			processDom.style.filter = 'alpha(opacity=0)';
			$timeout(function(){
				processDom.style.display = 'none';
			},300);
		};
	};
	//隐藏所有弹框
	function hide(){
		try{
			tipsDom.style.display = 'none';
			processDom.style.display = 'none';
		}catch(e){
			console.log('隐藏弹框出现了小问题');
		};
	};
	function preview(){
		tipsShow();
		// tipsHide();
		processShow();
		// processHide();
		hide();
	};
});