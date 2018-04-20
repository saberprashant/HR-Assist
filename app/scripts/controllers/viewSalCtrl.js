'use strict';

angular.module("hrmsAngularjsApp")
  .controller("viewSalCtrl", ['$document', 'SalaryServ', '$scope', '$timeout', '$state', '$uibModal',
    function ($document, SalaryServ, $scope, $timeout, $state, $uibModal) {



      SalaryServ.getSalaries()                //to get all salaries from db
        .then(function (response) {
          $scope.salaries = response.data;
        });
      // $scope.salaries = JSON.parse($scope.salaries)
      // if($scope.salaries)
      //  console.log($scope.salaries); 

      //to add new salary component
      $scope.addSalWindow = function (size, parentSelector) {
        var parentElem = parentSelector ?
          angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'views/createSal.html',
          controller: 'createSalCtrl',
          size: size,
          appendTo: parentElem,
          resolve: {
            editMode: false,
            salaryToEdit: undefined
          }
        });
      }

      //to edit a salary commponent
      $scope.editSalWindow = function (salary, size, parentSelector) {
        var parentElem = parentSelector ?
          angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'views/createSal.html',
          controller: 'createSalCtrl',
          size: size,
          appendTo: parentElem,
          resolve: {
            editMode: true,
            salaryToEdit: salary
          }
        });
      }


      //Remove salary component from saved salary components
      $scope.remove = function (id) {
        SalaryServ.deleteSalary(id)
          .then(success, failed);

        function success() {
          console.log("Salary Comp. deleted successfully");
          $scope.salDeleteSuccess = true;         //for error message
          $timeout(function () {
            $state.go("home.view_salary",{},{'reload':true});
          }, 1000)
        };

        function failed() {
          $scope.salDeleteFailed = true;         //for error message
          $timeout(function () {
            $state.go("home.view_salary",{},{'reload':true});
          }, 1000)
        };

      };




    }]);

