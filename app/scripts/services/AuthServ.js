'use strict';

angular.module("hrmsAngularjsApp")
  .factory("AuthServ", ['$http',
    function ($http) {
      let obj = {
        login(userData) {
          return $http.post('/api/auth/login', userData);
        },


        checkAuthorized: function () {
          return window.localStorage.getItem("authToken") != undefined;
        },


        logout() {
          window.localStorage.removeItem("authToken");
        }
      };
      return obj;
    }]);
