(function() {
  'use strict';
  angular.module('MenuApp',["ui.router"])
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
  .service('MenuDataService', MenuDataService)
  .controller('CategoriesListController', CategoriesListController)
  .controller('ItemsListController', ItemsListController)
  .component('categoriesList',{
    templateUrl: 'src/menuapp_singlefile/categoriesList.html',
    //controller: CategoriesListController,
    bindings: {
      cats: '<',
      apibp: '<',
      items: '<'
    }
  })
  .component('itemsList', {
    templateUrl: 'src/menuapp_singlefile/itemListDetails.html',
    bindings: {
      items: '<'
    }
  })
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
    .state('home', {
      url: '/home',
      template: '<div><a ui-sref="home">Home</a> > <a ui-sref="categories">Show Categories</a></div>'
    })
    .state('categories', {
      url: '/categories',
      //template: '<div>Categories</div><ui-view></ui-view>'
      templateUrl: 'src/menuapp_singlefile/categories.html'
    })
    .state('categories.items', {
      url: '/items/{itemSN}',
      //template: '<div>Items Here!</div>'
      templateUrl: 'src/menuapp_singlefile/itemsList.html',
      //controller: 'ItemsListController'
      // resolve: {
      //   itemsData: ['MenuDataService', '$stateParams', function(service, $stateParams){
      //     return service.getItemsForCategory($stateParams.item_param)
      //            .then(function(response){
      //              return response.data;
      //            });
      //   }]
      // }
      // params: {
      //   itemSN: null
      // }
    });
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
      var stuff = {
        category: categoryShortName
      };

      return $http({
        method: 'GET',
        url: ApiBasePath + "/menu_items.json",
        params: {category: categoryShortName}
      }).catch(function(error){
        console.log("Something went very wrong with the network request for menu_items: ", error);
      });
    };
  };

  CategoriesListController.$inject = ['MenuDataService', 'ApiBasePath'];
  function CategoriesListController(MenuDataService, ApiBasePath) {
    var clc = this;
    clc.apibp = ApiBasePath;
    clc.cats = [];
    clc.items = [];

    clc.$onInit = function() {
      MenuDataService.getAllCategories()
      .then(function(response){
        clc.cats = response.data;
        console.log("response data: ", clc.cats);
      });
    };

    clc.loadItems = function(sn) {
      MenuDataService.getItemsForCategory(sn)
      .then(function(response){
        clc.items = response.data;
        console.log("items response data: ", clc.items);
      });
    };
  };

  ItemsListController.$inject = ['MenuDataService'];
  function ItemsListController(MenuDataService){
    var ilc = this;
    ilc.ilitems = [];

    ilc.loadItems = function(sn) {
      MenuDataService.getItemsForCategory(sn)
      .then(function(response){
        ilc.ilitems = response.data;
        console.log("items response data: ", response.data);
      });
    };

  };

})();
