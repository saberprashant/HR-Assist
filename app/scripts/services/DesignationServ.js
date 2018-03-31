'use strict';

    angular.module("hrmsAngularjsApp")
    .factory("DesignationServ", ['$http',
     function($http){
      let obj = {
        saveDesig(desigData) {
          // var request = $http.post('http://localhost:3000/designations', desigData);
          // request.then(function(response) {
          //   console.log(response.data);
          // });
          return $http.post('http://localhost:3000/designations', desigData);
        },
        editDesig() {
          var request = $http.post('http://localhost:3000/designations', salary);
          request.then(function(response) {
            console.log(response.data);
          });
        },
        getDesig() {
          // var salariesObj;
          // self = this.salariesObj;
          return $http.get('http://localhost:3000/designations')
          .then(function(response) {
            // self = response.data;
            console.log('Designations',response.data);
            return response.data;
          });
          // return salariesObj;

        }
      };
        
      return obj;
    }]);
