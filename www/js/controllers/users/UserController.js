angular.module('fellowship.controllers')
  .controller('UserController', function($scope, UserService, ProfileService) {

    $scope.user = {};

    // Get quest information
    $scope.updateUserInfo = function() {
      ProfileService.getCurrentProfile()
        .then(
          (user) => { // SUCCESS
            $scope.user = user;
            console.log(user);
          },
          (data, status) => { // ERROR
            console.log("The user isn't logged in system")
          }
        )
    }

    // Authenticating user
    $scope.authenticate = function() {
      var organizationName = document.querySelector("#org-name").value;
      var username = document.querySelector("#username").value;
      var password = document.querySelector("#password").value;
      UserService.authenticate(username, password, organizationName)
      .then( (result) => {
        console.log('Logged in!');
        $scope.userName = username;
        // Redirect to our home.html
        window.location.href="home.html";
      }, (data, status) => {
        console.log('Error: ' + status);
      });
    };

    // User registration
    $scope.register = function() {
      // Taking the account information
      var firstName = document.querySelector("#first-name").value;
      var lastName = document.querySelector("#last-name").value;
      var username = document.querySelector("#username").value;
      var organizationName = document.querySelector("#org-name").value;
      var password = document.querySelector("#password").value;
      var confirmPassword = document.querySelector("#conf-password").value;

      if (password !== confirmPassword) {
        console.log('Password dont match!');
        return;
      }

      UserService.register(firstName, username, password, 'Member', organizationName)
      .then( (result) => {
        console.log('Account created!');
        // Redirect to our home.html
        window.location.href="home.html";
      }, (data, status) => {
        console.log("Error: " + status);
      });
    };

  });
