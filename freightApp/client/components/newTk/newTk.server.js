'use strict';

angular.module('yfApp')
.service('newTk',function(){
	var dom = null;
	preview();
	return {
		show:show,
		hide:hide
	};

	function show(str,time){
		str?dom.innerHTML = str : '';
		dom.style.display = 'block';
		time = time?time:3000;
		setTimeout(function(){
			angular.element(dom).fadeOut('slow');
		},time);
	};

	function hide(){
		angular.element(dom).fadeOut('slow');
	};
	function preview(){
		dom = document.createElement('div');
		dom.className = 'radius-normal';
		var obj = {
			position:'fixed',
			left:'50%',
			top:'50%',
			padding:'50px 10px',
			margin:'0px auto',
			backgroundColor:'rgba(0,0,0,0.5)',
			textAlign:'center',
			zIndex:'99',
			maxWidth:'200px',
			width:'80%',
			color:'#fff',
			fontSize:'16px',
			'WebkitTransform':'translate(-50%,-50%)',
			'MozTransform':'translate(-50%,-50%)',
			'MsTransform':'translate(-50%,-50%)',
			'OTransform':'translate(-50%,-50%)',
			'transform':'translate(-50%,-50%)',
		};
		for(var pro in obj){
			dom.style[pro] = obj[pro];
		};
		dom.innerHTML = '请您稍等！';
		(document.documentElement || document.body).appendChild(dom);
		dom.style.display = 'none';
	};
});