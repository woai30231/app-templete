'use strict';

var _version = '1.0.0'

angular.module('yfApp', [
  'ngSanitize',
  'ui.router'
])
.run(function ($rootScope,$state,$stateParams, $location){

})

.config(function($urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
        .otherwise('freight');

    $httpProvider.interceptors.push('authInterceptor');
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    var param = function(obj) {
        var query = '',
            name, value, fullSubName, subName, subValue, innerObj, i;

        for (name in obj) {
            value = obj[name];

            if (value instanceof Array) {
                for (i = 0; i < value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            } else if (value instanceof Object) {
                for (subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            } else if (value !== undefined && value !== null)
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }

        return query.length ? query.substr(0, query.length - 1) : query;
    };
    $httpProvider.defaults.transformRequest = [function(data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
})
.factory('authInterceptor', function($rootScope, $q) {
  return {
    // Add authorization token to headers
    request: function(config) {
      config.headers = config.headers || {};
      if (localStorage.getItem('inter_token')) {
        config.headers.token = localStorage.getItem('inter_token');
        config.headers.version = _version
      }
      return config;
    },
    response:function(response){
      if(response.config.method === 'POST'){
        var token =  response.headers('token');
        if(token){
          localStorage.setItem('inter_token',token);
        }
      }

      return response
    }
  };
})
