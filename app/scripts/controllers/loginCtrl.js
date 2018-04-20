'use strict';

angular.module("hrmsAngularjsApp")
  .controller("loginCtrl", ['$scope', '$state', 'AuthServ', '$timeout',
    function ($scope, $state, AuthServ, $timeout) {

      $scope.loginFailed = false;
      $scope.loginSuccess = false;

      $scope.loginBtn = () => {
        let userData = {
          username: $scope.userEmail,
          password: $scope.userPass
        }
        // console.log('User data in login', userData);
        AuthServ.login(userData)
          .then(res => {
            // console.log('res in login Ctrl', res.data);
            // console.log(res.data.token);
            window.localStorage.setItem('authToken', res.data.token)
            $scope.loginSuccess = true;
            $timeout(function () {
              $state.go('home.dashboard');
            }, 1500);
          })
          .catch(err => {
            console.log('Error in login Ctrl', err);
            $scope.loginFailed = true;
            $timeout(function () {
              $scope.loginFailed = false;
            }, 4000);
          })
      }

      $scope.userLogout = function() {
        AuthServ.logout();
        $state.go('login');
      }

    }]);

