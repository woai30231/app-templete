"use strict";

angular.module('yfApp')
.config(function($stateProvider){
	$stateProvider
	.state('remoteAdd',{
		url:'/remoteadd',
		params:{modelId:undefined,modelName:undefined},
		templateUrl:'app/remote-add/remote-add.html',
		controller:'RemoteaddController',
		controllerAs:'Re'
	});
});