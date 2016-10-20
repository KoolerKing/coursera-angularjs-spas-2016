(function() {
  'use strict';

  angular.module('MenuApp')
  .controller('itemsViewCtrl', itemsViewCtrl);

  itemsViewCtrl.$inject = ['itemsData'];
  function itemsViewCtrl(itemsData) {
    var ictrl = this;
    ictrl.itemsData = itemsData;
    ictrl.category = itemsData.category;
    ictrl.items = itemsData.menu_items;
  };

})();
