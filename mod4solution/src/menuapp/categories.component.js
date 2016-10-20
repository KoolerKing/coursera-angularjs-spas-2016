(function(){
  'use strict';

  angular.module('MenuApp')
  .component('menuCategories', {
    templateUrl: 'src/menuapp/categories.component.html',
    bindings: {
      categories: '<'
    }
  });

})();
