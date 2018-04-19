'use strict';

angular.module("hrmsAngularjsApp")
	.controller("loginCtrl", ['$scope', '$state', 'AuthServ',
		function ($scope, $state, AuthServ) {


      $scope.loginBtn = () => {
        let userData = {
          username: $scope.userEmail,
          password: $scope.userPass
        }
        // console.log('User data in login', userData);
        AuthServ.login(userData)
        .then( res => {
          // console.log('res in login Ctrl', res.data);
          // console.log(res.data.token);
          window.localStorage.setItem('authToken', res.data.token)
          $state.go('home');
        })
        .catch(err => {
          console.log('Error in login Ctrl', err);
        })
      }

		}]);

