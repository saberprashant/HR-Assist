'use strict';

    angular.module("hrmsAngularjsApp")
    .factory("EmployeeServ", ['$http',
     function($http){
      let obj = {

        saveEmployee(empData) {
          return $http.post('/create_emp', empData);
        },

        editEmployee(emp) {
          return $http.put('/create_emp/' + emp._id, emp);
        },

        getEmployee() {
          return $http.get('/view_emp');
        },

        getEmployeeWithId(data) {
          return $http.get('/create_emp/' + data.id);
        },

        deleteEmployee(id) {
          return $http.delete('/view_emp/' + id)
        }
      };
        
      return obj;
    }]);
