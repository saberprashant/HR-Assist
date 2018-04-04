'use strict';

angular.module("hrmsAngularjsApp")
  .factory("OvertimeServ", ['$http',
    function ($http) {
      let obj = {

        getOvertime() {
          return $http.get('http://localhost:3000/overtime');
        },

        editOvertime(overtime) {
          return $http.put('http://localhost:3000/overtime', overtime);
        }

      };

      return obj;
    }]);
