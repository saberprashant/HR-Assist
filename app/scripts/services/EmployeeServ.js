'use strict';

    angular.module("hrmsAngularjsApp")
    .factory("EmployeeServ", ['$http',
     function($http){
      let obj = {

        saveEmployee(empData) {
          console.log('Emp data in emp service', empData);
          return $http.post('/api/employees', empData);
        },

        editEmployee(emp) {
          return $http.put('/api/employees/' + emp._id, emp);
        },

        getEmployee() {
          return $http.get('/api/employees');
        },

        getEmployeeWithId(data) {
          return $http.get('/api/employees/' + data.id);
        },

        deleteEmployee(id) {
          return $http.delete('/api/employees/' + id)
        },

        getDesigWiseReport() {
          return $http.get('/api/employees/desigreport');
        }
      };
        
      return obj;
    }]);
