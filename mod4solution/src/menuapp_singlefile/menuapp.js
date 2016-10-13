(function() {
  'use strict';
  angular.module('MenuApp',["ui.router"])
  .service('MenuDataService', MenuDataService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
    .state('home', {
      url: '/home',
      template: '<div>Home</div>'
    })
    .state('categories', {
      url: '/categories',
      template: '<div>Categories</div>'
    })
    .state('items', {
      url: '/items',
      template: '<div>Items</div>'
    })
  };

  MenuDataService.$inject = ['$http', 'ApiBasePath'];
  function MenuDataService($http, ApiBasePath) {
    var mds = this;

    mds.getAllCategories = function() {
      return $http({
        method: 'GET',
        url: ApiBasePath + "/categories.json"
      }).catch(function(error){
        console.log("Something went very wrong with the network request for categories: ", error);
      });
    };

    mds.getItemsForCategory = function(categoryShortName) {
      return $http({
        method: 'GET',
        url: ApiBasePath + "/menu_items.json?category=" + categoryShortName
      }).catch(function(error){
        console.log("Something went very wrong with the network request for menu_items: ", error);
      });
    };
  };

})();
