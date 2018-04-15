'use strict';

angular.module("hrmsAngularjsApp")
  .controller("viewDesigCtrl", ['DesignationServ', '$scope', '$timeout', '$state',
    function (DesignationServ, $scope, $timeout, $state) {

      DesignationServ.getDesig()
      .then(function(response){
        $scope.designations = response.data;
      });

      $scope.addDesig = function() {
        $state.go('create_desig');
      }


    }]);

