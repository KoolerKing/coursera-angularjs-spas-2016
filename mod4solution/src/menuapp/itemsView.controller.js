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
    if ((ictrl.category === undefined) || (ictrl.category.name === undefined) || (ictrl.category.name === '')) {
      ictrl.category = {name: 'All'}
    }
  };

})();
