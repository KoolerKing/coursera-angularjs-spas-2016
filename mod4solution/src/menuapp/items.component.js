(function() {
  'use strict';

  angular.module('MenuApp')
  .component('itemsForCategory', {
    templateUrl: 'src/menuapp/items.component.html',
    bindings: {
      items: '<'
    }
  });

})();
