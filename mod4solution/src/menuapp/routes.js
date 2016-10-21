(function() {
  'use strict';

  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'src/menuapp/homeView.html'
    })
    .state('categories', {
      url: '/categories',
      templateUrl: 'src/menuapp/categoriesView.html',
      controller: 'categoriesViewCtrl as cvc',
      resolve: {
        categoriesData: ['MenuDataService', function(MenuDataService) {
          return MenuDataService.getAllCategories().then(function(response) {
            //console.log("found categories data: ", response.data);
            return response.data;
          });
        }]
      },
      bindings: {
        categories: '<'
      }
    })
    .state('items', {
      url: '/items/{itemSN}',
      templateUrl: 'src/menuapp/itemsView.html',
      controller: 'itemsViewCtrl as ivc',
      resolve: {
        itemsData: ['MenuDataService', '$stateParams', function(MenuDataService, $stateParams) {
          var isn = $stateParams.itemSN;
          //console.log("found parameter: ", isn);
          return MenuDataService.getItemsForCategory(isn).then(function(response) {
            //var t2 = response.data.menu_items;
            //console.log("found response data: ", response.data);
            //return t2;
            return response.data;
          });
        }]
      },
      bindings: {
        items: '<'
      }
    })
  };

})();
