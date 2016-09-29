(function() {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController ($scope) {
  var resMessages = ["Please enter data first.", "Enjoy!", "Too Much!"];
  $scope.inputList = "";
  $scope.itemCount = 0;
  $scope.resultMessage = "";
  $scope.getItemCount = function() {
      var ivals;
      if ($scope.inputList) {
        ivals = $scope.inputList.split(",");
        $scope.itemCount = countItems(ivals);
      } else {
        $scope.itemCount = 0;
      }
  };
  $scope.evalInput = function() {
    if ($scope.itemCount === 0) {
      $scope.resultMessage = resMessages[0];
    } else if (($scope.itemCount > 0) && ($scope.itemCount <= 3)) {
      $scope.resultMessage = resMessages[1];
    } else {
      $scope.resultMessage = resMessages[2];
    }
  };
};

function countItems (alist) {
  return alist.filter(checkString).length;
}

function checkString (aString) {
  var tString = aString.trim();
  return (tString != "" && tString != undefined)
}

})();
