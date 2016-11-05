(function() {
  'use strict';

  angular.module('public')
  .controller('MyInfoController2', MyInfoController2);

  MyInfoController2.$inject = ['userInfo', 'favdeets'];
  function MyInfoController2(userInfo, favdeets) {
    var $ctrl = this;

    $ctrl.ui = userInfo;
    $ctrl.fd = favdeets;
  }

})();
