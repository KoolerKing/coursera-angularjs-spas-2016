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
      //console.log("Submit fired in SignUpController");
      console.log("First name:   ", ctrl.firstname);
      console.log("Last name:    ", ctrl.lastname);
      console.log("Email:        ", ctrl.emailaddress);
      console.log("Phone Number: ", ctrl.phonenumber);
      console.log("Fav Item:     ", ctrl.favmenuitem);
      //ctrl.badmenuitem = true;
      var userx = {
        fn: ctrl.firstname,
        ln: ctrl.lastname,
        ea: ctrl.emailaddress,
        pn: ctrl.phonenumber,
        fmi: (ctrl.favmenuitem).toUpperCase()
      };

      ctrl.checking = true;
      ctrl.statusmessage = checking_message;
      //var res1 = DataService.getData(ctrl.favmenuitem);
      //ctrl.statusmessage = res1;
      //DataService.saveUserInfo(userx);
      //DataService.getItemDetails(userx.fmi);
      //var fmiu = (ctrl.favmenuitem).toUpperCase();
      //ctrl.favmenuitem = fmiu;
      $http.get(BasePath + '/menu_items/' + userx.fmi + '.json')
      .then(
        function success(response){
          console.log("Found menu item: ", ctrl.favmenuitem);
          console.log("Menu Item details: ", response.data);
          DataService.saveUserInfo(userx);
          DataService.saveItemDetails(response.data);
          ctrl.badmenuitem = false;
          ctrl.statusmessage = good_completion_message;
        },
        function error(err_response){
          console.log("Error: menu item not found.");
          ctrl.badmenuitem = true;
          //ctrl.checking = false;
          ctrl.statusmessage = resubmit_message;
        });
    };
  };

})();
