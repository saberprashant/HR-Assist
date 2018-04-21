'use strict';

angular.module("hrmsAngularjsApp")
  .controller("viewDesigCtrl", ['DesignationServ', '$scope', '$timeout', '$state', 'DesigData',
    function (DesignationServ, $scope, $timeout, $state, DesigData) {

      // DesignationServ.getDesig()
      // .then(function(response){
      //   $scope.designations = response.data;
      // });

      $scope.designations = DesigData.data;
      
      $scope.addDesig = function() {
        $state.go('home.create_desig');
      }

      
    }]);

