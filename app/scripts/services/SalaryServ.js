'use strict';

angular.module("hrmsAngularjsApp")
  .factory("SalaryServ", ['$http',
    function ($http) {
      let obj = {
        saveSalary(salary) {

          return $http.post('/view_salary', salary);

          // var request = $http.post('http://localhost:3000/salaries', salary);       //another way of doing
          // request.then(function (response) {
          //   console.log(response.data);
          // });
        },

        editSalary(salary) {
          return $http.put('/view_salary/' + salary._id, salary);
        },

        getSalaries() {
          return $http.get('/view_salary');
          // .then(function(response) {
          //   // self = response.data;
          //   console.log('Salaries',response.data);
          //   return response.data;
          // });
          // return salariesObj;

        },

        deleteSalary(id) {
          return $http.delete('/view_salary/' + id)
        }
      };

      return obj;
    }]);
