(function(){
'use strict';

angular.module('ShoppingListCheckoff',[])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckoffService', ShoppingListCheckoffService);

//ShoppingListCheckoffService.$inject = ['$scope'];
function ShoppingListCheckoffService() {
  var slcService = this;
  var buyItems = [{name: "cookies", quantity: 10},
                  {name: "hammer", quantity: 5},
                  {name: "sickle", quantity: 3},
                  {name: "pot", quantity: 2},
                  {name: "gold bar", quantity: 1}];
  var boughtItems = [];

  slcService.checkOffandTransferItem = function (index) {
    var coItem = buyItems[index];
    buyItems.splice(index, 1);
    boughtItems.push(coItem);
  };

  slcService.getToBuyItems = function () {
    return buyItems;
  };

  slcService.getAlreadyBoughtItems = function () {
    return boughtItems;
  };

};

ToBuyController.$inject = ['ShoppingListCheckoffService'];
function ToBuyController(Sscope, ShoppingListCheckoffService) {
  var buyList = this;
  buyList.tbItems = ShoppingListCheckoffService.getToBuyItems();

  buyList.checkOffItem = function (itemIndex) {
    ShoppingListCheckoffService.checkOffandTransferItem(itemIndex);
  };
};

AlreadyBoughtController.$inject = ['ShoppingListCheckoffService'];
function AlreadyBoughtController($scope, ShoppingListCheckoffService) {
  var boughtList = this;
  boughtList.abItems = ShoppingListCheckoffService.getAlreadyBoughtItems();
};


})();
