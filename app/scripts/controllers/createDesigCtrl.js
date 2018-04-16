'use strict';

angular.module("hrmsAngularjsApp")
  .controller("createDesigCtrl", ['SalaryServ', 'DesignationServ', '$scope', '$timeout', '$state',
    function (SalaryServ, DesignationServ, $scope, $timeout, $state) {


      $scope.selectedSalaries = [];

      SalaryServ.getSalaries()
      .then(function (response) {
        $scope.availableSalaries = response.data;
      });

      // $scope.update = function(index, item, external, type) {
      //   updateTotal();
      // }

      $scope.updateTotal = function () {
        console.log('Inside update total');
        
        $timeout(function () {
          $scope.total = parseInt($scope.basicAmount);
          for (let i = 0; i < $scope.selectedSalaries.length; i++) {

            console.log($scope.selectedSalaries[i]);
            if ($scope.selectedSalaries[i].type == 'allowance') {
              if ($scope.selectedSalaries[i].inputType == 'percentage') {
                $scope.total = parseInt($scope.total) + parseInt($scope.selectedSalaries[i].percentage) * parseInt($scope.basicAmount) / 100;
              }
              else
                $scope.total = parseInt($scope.total) + parseInt($scope.selectedSalaries[i].amount);

            }
            else {
              if ($scope.selectedSalaries[i].inputType == 'percentage') {
                $scope.total = parseInt($scope.total) - parseInt($scope.selectedSalaries[i].percentage) * parseInt($scope.basicAmount) / 100;
              }
              else
                $scope.total = parseInt($scope.total) - parseInt($scope.selectedSalaries[i].amount);
            }
          }
        }, 500);
      };


      //Set total to basic amount initially
      $scope.total = parseInt($scope.basicAmount);


      
      $scope.addDesignation = function () {
        var newDesignation = {};
        newDesignation.name = $scope.designationName;
        newDesignation.description = $scope.designationDescription;
        newDesignation.salaryStructure = $scope.selectedSalaries;
        let basic = { 'name': 'basic', 'type': 'allowance', 'amount': $scope.basicAmount }
        newDesignation.salaryStructure.push(basic);
        DesignationServ.saveDesig(newDesignation)
        .then(success, failed);

        function success() {
          console.log("Designation added successfully");
          $scope.designationSuccess = true;
          // $timeout(function () {
          //   $state.go("view_desig");
          // }, 1000)
        };

        function failed() {
          $scope.designationFailed = true;
          // $timeout(function () {
          //   $state.go("home");
          // }, 1000)
        };
      };

      //Remove item from selected salaries
      $scope.remove = function (id) {
        for (let i = 0; i < $scope.selectedSalaries.length; i++) {
          if ($scope.selectedSalaries[i]._id === id) {
            $scope.availableSalaries.push($scope.selectedSalaries[i])
            $scope.selectedSalaries.splice(i, 1);
          }
        } 
        $scope.updateTotal();
      };


      $scope.cancelDesig = function() {
        $state.go('home');
      }

    }]);

