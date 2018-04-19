'use strict';

    angular.module("hrmsAngularjsApp")
    .factory("EmployeeServ", ['$http',
     function($http){
      let obj = {

        saveEmployee(empData) {
          console.log('Emp data in emp service', empData);
          return $http.post('/employees', empData);
        },

        editEmployee(emp) {
          return $http.put('/employees/' + emp._id, emp);
        },

        getEmployee() {
          return $http.get('/employees');
        },

        getEmployeeWithId(data) {
          return $http.get('/employees/' + data.id);
        },

        deleteEmployee(id) {
          return $http.delete('/employees/' + id)
        }
      };
        
      return obj;
    }]);
