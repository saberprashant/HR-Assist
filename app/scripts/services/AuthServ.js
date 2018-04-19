'use strict';

angular.module("hrmsAngularjsApp")
  .factory("AuthServ", ['$http',
    function ($http) {
      let obj = {
        login(userData) {
          return $http.post('/auth/login', userData);
        },


        checkAuthorized: function () {
          return window.localStorage.getItem("authToken") != undefined;
        },


        logout: function () {
          window.localStorage.removeItem("authToken");
        }
      };
      return obj;
    }]);
