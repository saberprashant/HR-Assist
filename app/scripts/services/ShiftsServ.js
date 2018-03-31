'use strict';

    angular.module("hrmsAngularjsApp")
    .factory("ShiftsServ", ['$http',
     function($http){
      let obj = {
        saveShift(shift) {
          return $http.post('http://localhost:3000/shifts', shift);
          // request.then(function(response) {
          //   console.log(response.data);
          // });
        },

        editShift(shift) {
          return $http.put('http://localhost:3000/shifts/' + shift.id, shift);

        },

        getShifts() {
          return $http.get('http://localhost:3000/shifts')
        },

        deleteShift(id) {
          return $http.delete('http://localhost:3000/shifts/' + id)
        }
      };
        
      return obj;
    }]);
