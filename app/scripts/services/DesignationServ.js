'use strict';

    angular.module("hrmsAngularjsApp")
    .factory("DesignationServ", ['$http',
     function($http){
      let obj = {
        saveDesig(desigData) {
          return $http.post('/create_desig', desigData);
        },
        editDesig() {
          var request = $http.post('/create_desig', salary);
          request.then(function(response) {
            console.log(response.data);
          });
        },
        getDesig() {
          return $http.get('/view_desig')
        }
      };
        
      return obj;
    }]);
