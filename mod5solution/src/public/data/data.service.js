(function() {
  'use strict';

  angular.module('public')
  .service('DataService', dataService);
  //.constant('BasePath', "https://ko-angular-course.herokuapp.com");

  dataService.$inject = [];
  function dataService () {
    var service = this;
    var userinfo = {};

    service.item_details = {};

    // service.getData = function (fmi) {
    //   console.log("In the data service getData function.", fmi);
    //   return fmi;
    // }

    service.saveUserInfo = function (ux) {
      service.userinfo = ux;
      console.log("Saving: ", ux);
    }

    service.getUserInfo = function() {
      //console.log("Reading userInfo: ", service.userinfo);
      return service.userinfo;
    }

    service.saveItemDetails = function(deets) {
      service.item_details = deets;
    }

    service.getItemDetails = function() {
      return service.item_details;
    }

    // service.getItemDetails = function(fmi) {
    //   // var config = {};
    //   // if (fmi) {
    //   //   config.params = {'short_name': fmi};
    //   // };
    //   if (fmi == undefined)
    //      return
    //   else {
    //     $http.get(BasePath + '/menu_items/'+ fmi + '.json').then(function (response) {
    //       console.log("response: ", response.data);
    //       service.item_details = response.data;
    //       return response.data;
    //     })
    //   }
    // }

    // service.getItemDetails2 = function() {
    //   $http.get(BasePath + '/menu_items/'+ fmi + '.json').then(function (response) {
    //     console.log("response: ", response.data);
    //     return response.data;
    //   })
    // }
    // service.getItemDetails2 = function(fmi) {
    //   console.log("looking, looking ....");
    //   $http.get(BasePath + '/menu_items/'+ fmi + '.json').then(function (response) {
    //     console.log("response: ", response.data);
    //     return response.data;
    //   })
    // }
  };

})();
