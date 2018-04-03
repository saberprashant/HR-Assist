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


    }]);
