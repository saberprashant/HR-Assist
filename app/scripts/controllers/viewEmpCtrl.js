'use strict';

angular.module("hrmsAngularjsApp")
  .controller("viewEmpCtrl", ['EmployeeServ', '$scope', '$timeout', '$state',
    function (EmployeeServ, $scope, $timeout, $state) {

      $scope.employeeDeleteSuccess = false;
      $scope.employeeDeleteFailed = false;
      EmployeeServ.getEmployee()
        .then(function (response) {
          $scope.employees = response.data;
        });

      $scope.addEmp = function () {
        $state.go('create_emp', { 'type': 'new', 'id': 0 });
      }


      $scope.editEmp = function (emp) {
        $state.go('create_emp', { 'type': 'edit', 'id': emp._id })
      }



      //Remove employee from all employees
      $scope.remove = function (id) {
        EmployeeServ.deleteEmployee(id)
          .then(success, failed).finally(function () {
            $timeout(function () {
              $state.go("view_emp",{},{'reload':true});
            }, 1000);
          });

        function success() {
          console.log('Employee Deleted');
          $scope.employeeDeleteSuccess = true;
        }

        function failed() {
          $scope.employeeDeleteFailed = true;
        }
      };

    }]);

