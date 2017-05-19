"use strict";

angular.module('yfApp')
.factory('dialog',function(){
	var dialogDom = document.createElement('div');
	var cssObj = {
		position:"absolute",
		left:'50%',
		top:'50%',
		maxWidth:'250px',
		width:'80%',
		background:'#fff',
		color:"#ccc",
		textAlign:"center",
		minHeight:'100px',
		WebkitTransform:'translate(-50%,-50%)',
		MozTransform:'translate(-50%,-50%)',
		MsTransform:'translate(-50%,-50%)',
		OTransform:'translate(-50%,-50%)',
		Transform:'translate(-50%,-50%)',
		borderRadius:'6px',
		overflow:'hidden'
	};
	var dialogCss = {
		position:'fixed',
		left:0,
		top:0,
		right:0,
		bottom:0,
		backgroundColor:'rgba(0,0,0,0.6)',
		zIndex:99
	};
	for(var pro in dialogCss){
		dialogDom.style[pro] = dialogCss[pro];
	};
	var contentDom = document.createElement('div');
	for(var pro1 in cssObj){
		contentDom.style[pro1] = cssObj[pro1];
	};
	dialogDom.appendChild(contentDom);
	var htmlStr = '<h1 data-dialog-title style="text-align:left;padding:0px 8px;font-size:16px;border-bottom:1px solid #eee;line-height:40px;">提示</h1>\n'+
				'<p id="data-dialog-text" style="color:#000;padding:10px 8px;line-height:1.5;margin:1em 0em;">你确定要删除吗？</p>\n'+
				'<div style="overflow:hidden;">\n'+
				'<a class="dialog-btn" href="javascript:void(0);" cancel-btn title="取消">取消</a>\n'+
				'<a class="dialog-btn" href="javascript:void(0);" ensure-btn title="确定">确定</a>\n'+
				'</div>';
	contentDom.innerHTML = htmlStr;
	var pStr = angular.element(contentDom);
	var pText = $(pStr[0]).find('#data-dialog-text');
	//取消按钮
	var cancelBtn = $(pStr[0]).find('a[cancel-btn]');
	//确定按钮
	var ensureBtn = $(pStr[0]).find('a[ensure-btn]');
	var body = document.body || document.documentElement;
	//是否第一次
	var isFirstTime = true;
	return{
		show:show,//显示询问对话框
		hide:hide//隐藏对话框
	};
	function show(ensure,str){
		str = str?str:'你确定需要删除吗？';
		if(isFirstTime){
			isFirstTime = false;
			body.appendChild(dialogDom);
		};
		pText.text(str);
		$(dialogDom).fadeIn('slow');
		cancelBtn[0].onclick = function(){
			hide();
		};
		ensureBtn[0].onclick = function(){
			hide();
			ensure();
		};
	};
	function hide(){
		$(dialogDom).fadeOut('slow');
	};
});