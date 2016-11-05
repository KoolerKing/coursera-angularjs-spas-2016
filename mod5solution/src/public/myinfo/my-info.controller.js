(function() {
  'use strict';

  angular.module('public')
  .controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['DataService', 'BasePath'];
  function MyInfoController(DataService, BasePath) {
    var mic = this;
    mic.basePath = BasePath;

    mic.isRegistered = function () {
      mic.ui = DataService.getUserInfo();
      if (mic.ui != undefined)

          { 
            mic.favdeets = DataService.item_details;
            return true;
           }
          else {
                 return false;
                };
    };

  };

})();
