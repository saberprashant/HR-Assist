'use strict';

    angular.module("hrmsAngularjsApp")
    .factory("DesignationServ", ['$http',
     function($http){
      let obj = {
        saveDesig(desigData) {
          return $http.post('/api/designations', desigData);
        },
        editDesig() {
          var request = $http.post('/api/designations', salary);
          request.then(function(response) {
            console.log(response.data);
          });
        },
        getDesig() {
          return $http.get('/api/designations')
        }
      };
        
      return obj;
    }]);
