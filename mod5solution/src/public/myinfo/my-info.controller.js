(function() {
  'use strict';

  angular.module('public')
  .controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['DataService', 'BasePath'];
  function MyInfoController(DataService, BasePath) {
    var mic = this;
    mic.basePath = BasePath;
    //mic.favdeets = favdeets;

    mic.isRegistered = function () {
      mic.ui = DataService.getUserInfo();
      if (mic.ui != undefined)

          { //console.log("looking for fmi: ", mic.ui.fmi);
            //mic.favdeets = DataService.getItemDetails(mic.ui.fmi);
            mic.favdeets = DataService.item_details;
            return true;
           }
          else {
                 return false;
                };
    };

  };

})();
