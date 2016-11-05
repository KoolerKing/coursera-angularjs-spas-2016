(function() {
  'use strict';

  angular.module('public')
  .service('DataService', dataService);

  function dataService () {
    var service = this;
    var userinfo = {};

    service.item_details = {};

    service.saveUserInfo = function (ux) {
      service.userinfo = ux;
    }

    service.getUserInfo = function() {
      return service.userinfo;
    }

    service.saveItemDetails = function(deets) {
      service.item_details = deets;
    }

    service.getItemDetails = function() {
      return service.item_details;
    }
  };

})();
