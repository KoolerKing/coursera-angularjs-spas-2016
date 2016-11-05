(function () {
  'use strict';

  angular.module('public')
  .controller('SignUpController', SignUpController)
  .constant('BasePath', 'https://ko-angular-course.herokuapp.com');

  SignUpController.$inject = ['DataService', '$http', 'BasePath'];
  function SignUpController(DataService, $http, BasePath) {
    var ctrl = this;
    ctrl.badmenuitem = false;
    ctrl.completegoodform = false;

    ctrl.checking = false;
    var checking_message = "Now checking menu item ...";
    var good_completion_message = "Your information has been saved."
    var resubmit_message = "Please fix errors and resubmit."

    ctrl.submit = function() {

      var userx = {
        fn: ctrl.firstname,
        ln: ctrl.lastname,
        ea: ctrl.emailaddress,
        pn: ctrl.phonenumber,
        fmi: (ctrl.favmenuitem).toUpperCase()
      };

      ctrl.checking = true;
      ctrl.statusmessage = checking_message;

      $http.get(BasePath + '/menu_items/' + userx.fmi + '.json')
      .then(
        function success(response){
          DataService.saveUserInfo(userx);
          DataService.saveItemDetails(response.data);
          ctrl.badmenuitem = false;
          ctrl.statusmessage = good_completion_message;
        },
        function error(err_response){
          ctrl.badmenuitem = true;
          ctrl.statusmessage = resubmit_message;
        });
    };
  };

})();
