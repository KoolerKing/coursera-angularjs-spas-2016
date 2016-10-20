(function() {
  'use strict';

  angular.module('MenuApp')
  .controller('categoriesViewCtrl', categoriesViewCtrl);

  categoriesViewCtrl.$inject = ['categoriesData'];
  function categoriesViewCtrl(categoriesData) {
    var cctrl = this;
    cctrl.categories = categoriesData;
  };

})();
