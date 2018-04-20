'use strict';

    angular.module("hrmsAngularjsApp")
    .factory("ShiftsServ", ['$http',
     function($http){
      let obj = {
        saveShift(shift) {
          return $http.post('/api/view_shifts', shift);
          // request.then(function(response) {
          //   console.log(response.data);
          // });
        },

        editShift(shift) {
          return $http.put('/api/view_shifts/' + shift._id, shift);

        },

        getShifts() {
          return $http.get('/api/view_shifts')
        },

        deleteShift(id) {
          return $http.delete('/api/view_shifts/' + id)
        }
      };
        
      return obj;
    }]);
