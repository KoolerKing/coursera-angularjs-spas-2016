(function(){
  'use strict';

  angular.module('MenuApp3',['ui.router'])
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
  .service('MenuDataService', MenuDataService)
  .controller('categoriesViewCtrl', categoriesViewCtrl)
  .controller('itemsViewCtrl', itemsViewCtrl)
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
    .state('home', {
      url: '/home',
      template: '<div><a ui-sref="home">Home</a> > <a ui_sref="categories">Categories</a> > <a ui-sref="items()">Show All Items</a></div>'
    })
    .state('categories', {
      url: '/categories',
      //template: '<div><a ui-sref="home">Home</a> > <a ui_sref="categories">Categories Home</a></div>',
      templateUrl: 'src/menuapp_singlefile/categoriesList3.html',
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
      templateUrl: 'src/menuapp_singlefile/itemListDetails3.html',
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

  categoriesViewCtrl.$inject = ['categoriesData'];
  function categoriesViewCtrl(categoriesData) {
    var cctrl = this;
    cctrl.categories = categoriesData;
  };

  itemsViewCtrl.$inject = ['itemsData'];
  function itemsViewCtrl(itemsData) {
    var ictrl = this;
    ictrl.itemsData = itemsData;
    ictrl.category = itemsData.category;
    ictrl.items = itemsData.menu_items;
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
        url: ApiBasePath + "/menu_items.json",
        params: {category: categoryShortName}
      }).catch(function(error){
        console.log("Something went very wrong with the network request for menu_items: ", error);
      });
    };
  };

})();
