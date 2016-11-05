(function() {
"use strict";

angular.module('common', [])
//.constant('ApiPath', 'https://ychaikin-course5.herokuapp.com')
.constant('ApiPath', 'https://ko-angular-course.herokuapp.com')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
