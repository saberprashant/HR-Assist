'use strict';

    angular.module("hrmsAngularjsApp")
    .factory("EmployeeServ", ['$http',
     function($http){
      let obj = {

        saveEmployee(empData) {
          return $http.post('http://localhost:3000/employees', empData);
        },

        editEmployee(emp) {
          return $http.put('http://localhost:3000/employees/' + emp.id, emp);
        },

        getEmployee() {
          return $http.get('http://localhost:3000/employees');
        },

        getEmployeeWithId(data) {
          return $http.get('http://localhost:3000/employees/' + data.id);
        },

        deleteEmployee(id) {
          return $http.delete('http://localhost:3000/employees/' + id)
        }
      };
        
      return obj;
    }]);
