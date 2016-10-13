(function() {
  'use strict';

  angular.module('data')
  .service('MenuDataService', MenuDataService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")

  MenuDataService.$inject = ['$http', 'ApiBasePath'];
  function MenuDataService($http, ApiBasePath) {
    var mds = this;

    mds.getAllCategories = function() {

    };

    mds.getItemsForCategory = function(categoryShortName) {

    };
  };

})();
