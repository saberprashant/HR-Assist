'use strict';

angular.module("hrmsAngularjsApp")
  .factory("OvertimeServ", ['$http',
    function ($http) {
      let obj = {

        getOvertime() {
          return $http.get('/api/overtime');
        },

        editOvertime(overtime) {
          return $http.put('/api/overtime/' + overtime._id, overtime);
        }

      };  

      return obj;
    }]);
