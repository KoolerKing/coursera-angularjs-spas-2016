(function() {
  'use strict';
  angular.module('MenuApp',[])
  .service('MenuDataService', MenuDataService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


  MenuDataService.$inject = ['$http', 'ApiBasePath'];
  function MenuDataService($http, ApiBasePath) {
    var mds = this;

    mds.getAllCategories = function() {
      return $http({
        method: 'GET',
        url: ApiBasePath + "/categories.json"
      }).catch(function(error){
        console.log("Something went very wrong with the network request: ", error);
      });
    };

    mds.getItemsForCategory = function(categoryShortName) {

    };
  };

})();
