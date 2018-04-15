'use strict';

    angular.module("hrmsAngularjsApp")
    .factory("ShiftsServ", ['$http',
     function($http){
      let obj = {
        saveShift(shift) {
          return $http.post('/view_shifts', shift);
          // request.then(function(response) {
          //   console.log(response.data);
          // });
        },

        editShift(shift) {
          return $http.put('/view_shifts/' + shift._id, shift);

        },

        getShifts() {
          return $http.get('/view_shifts')
        },

        deleteShift(id) {
          return $http.delete('/view_shifts/' + id)
        }
      };
        
      return obj;
    }]);
