'use strict';

angular.module("hrmsAngularjsApp")
  .factory("OvertimeServ", ['$http',
    function ($http) {
      let obj = {

        getOvertime() {
          return $http.get('/overtime');
        },

        editOvertime(overtime) {
          return $http.put('/overtime/' + overtime._id, overtime);
        }

      };  

      return obj;
    }]);
