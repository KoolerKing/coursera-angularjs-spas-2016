(function() {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
  .directive('foundItems', FoundItemsDirective);

NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];
function NarrowItDownController($scope, MenuSearchService) {
  var nidc = this;
  var statusMessages = {
    start: "Enter a choice ...",
    emptySearchTitle: "Nothing Found",
    resultsTitle: "Found Items:"
  };
  $scope.statusMessage = statusMessages.start;
  $scope.searchTerm = "";

  nidc.narrowItDown = function() {
    var gotMI = MenuSearchService.getMatchedMenuItems($scope.searchTerm);
    gotMI.then(function(response){
      nidc.found = response;
      setStatusMessage();
    })
    .catch(function(error){
      nidc.found = [];
      setStatusMessage();
    });
  };

  nidc.removeItem = function(index) {
    nidc.found.splice(index, 1);
  };

  nidc.emptyLists = function() {
    return ($scope.searchTerm === "") || (!nidc.found || (nidc.found.length === 0))
  };

  function setStatusMessage() {
     if (nidc.emptyLists()) {
       $scope.statusMessage = statusMessages.emptySearchTitle;
     } else {
       $scope.statusMessage = statusMessages.resultsTitle;
     }
  };
};

//FoundItems.$inject = [];
function FoundItemsDirective() {
  var ddo = {
    restrict: "E",
    templateUrl: "src/found_items.html",
    scope: {
      list: "<foundItems",
      onRemove: '&'
    }
  };
  return ddo;
};


MenuSearchService.$inject = ['$http', 'ApiBasePath', '$q'];
function MenuSearchService($http, ApiBasePath, $q) {
  var service = this;

  service.getMenuItems = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });
    return response;
  };

  service.getMatchedMenuItems3 = function(searchTerm) {
      return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      }).then(function(response){
        service.menu_items = response.data;
        return itemFilter(service.menu_items, searchTerm);
      }).catch(function(error){
        console.log("Something went very wrong with the network request: ", error);
      })
  };

  service.getMatchedMenuItems = function(searchTerm) {
    if (!service.menu_items) {
      return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      }).then(function(response){
        service.menu_items = response.data.menu_items;
        return itemFilter(service.menu_items, searchTerm);
      }).catch(function(error){
        console.log("Something went very wrong with the network request: ", error);
      })
    } else {
      var newItems = itemFilter(service.menu_items, searchTerm);
      var defer = $q.defer();
      defer.resolve(newItems);
      return defer.promise;
    };
  };

  function itemFilter(items, aSearchTerm) {
      if (aSearchTerm === "") {
        return [];
      } else {
        return items.filter(function(aTerm) {
           var foundIndex = aTerm.description.indexOf(aSearchTerm);
           if (foundIndex > -1) {
             return true;
           } else {
             return false;
           }
        })
      }
  };

};

})();
