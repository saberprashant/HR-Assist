'use strict';

angular.module("hrmsAngularjsApp")
  .controller("viewDesigCtrl", ['DesignationServ', '$scope', '$timeout', '$state',
    function (DesignationServ, $scope, $timeout, $state) {

      DesignationServ.getDesig()
      .then(function(data){
        $scope.designations = data;
      });

      $scope.addDesig = function() {
        $state.go('create_desig');
      }
      //Remove item from selected salaries
      $scope.remove = function (id) {
        for (let i = 0; i < $scope.selectedSalaries.length; i++) {
          if ($scope.selectedSalaries[i].id === id) {
            $scope.availableSalaries.push($scope.selectedSalaries[i])
            $scope.selectedSalaries.splice(i, 1);
          }
        } 
        $scope.updateTotal();
      };


    }]);

