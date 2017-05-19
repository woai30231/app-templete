"use strict";

angular.module('yfApp')
.config(function($stateProvider){
	$stateProvider
	.state('yfModel',{
		url:'/yfModel',
		params:{modelId:undefined,modelName:undefined,getNewModel:false,shopId:undefined},
		templateUrl:'app/yf-model/yf-model.html',
		controller:'YfmodelController',
		controllerAs:'yf'
	});
});