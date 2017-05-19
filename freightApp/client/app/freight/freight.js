"use strict";

angular.module('yfApp')
.config(function($stateProvider){
	$stateProvider
	.state('freight',{
		url:'/freight',
		templateUrl:'app/freight/freight.html',
		controller:'FreightController',
		controllerAs:'frei'
	});
});