'use strict';

angular.module("hrmsAngularjsApp")
  .factory("SalaryServ", ['$http',
    function ($http) {
      let obj = {
        saveSalary(salary) {

          return $http.post('http://localhost:3000/salaries', salary);

          // var request = $http.post('http://localhost:3000/salaries', salary);       //another way of doing
          // request.then(function (response) {
          //   console.log(response.data);
          // });
        },

        editSalary(salary) {
          return $http.put('http://localhost:3000/salaries/' + salary.id, salary);
        },

        getSalaries() {
          return $http.get('http://localhost:3000/salaries');
          // .then(function(response) {
          //   // self = response.data;
          //   console.log('Salaries',response.data);
          //   return response.data;
          // });
          // return salariesObj;

        },

        deleteSalary(id) {
          return $http.delete('http://localhost:3000/salaries/' + id)
        }
      };

      return obj;
    }]);
