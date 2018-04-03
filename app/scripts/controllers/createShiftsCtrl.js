'use strict';

angular.module("hrmsAngularjsApp")
  .controller("createShiftsCtrl", ['ShiftsServ','$scope','$timeout','$state','$uibModalInstance','editMode','shiftToEdit',
    function (ShiftsServ, $scope, $timeout, $state,$uibModalInstance, editMode, shiftToEdit) {

      $scope.editMode = editMode;

      if (editMode)
        $scope.shift = shiftToEdit;     //if want to edit existing shift
      else
        $scope.shift = {};          // if want to create new shift

      $scope.shift.start = new Date();
      $scope.shift.end = new Date();
      // To add a new shift
      $scope.addShift = function () {

        ShiftsServ.saveShift($scope.shift)
          .then(success, failed);

        function success() {
          console.log("Shift added successfully");
          $scope.shiftSuccess = true;         //for error message
          $timeout(function () {
            $scope.cancel();
            // $state.go("view_shifts",{},{'reload':true});
          }, 1000)
        };

        function failed() {
          $scope.shiftFailed = true;         //for error message
          $timeout(function () {
            $scope.cancel();
            // $state.go("view_shifts",{},{'reload':true});
          }, 1000)
        };

      };


      $scope.updateShift = function (shift) {

        ShiftsServ.editShift(shift)
          .then(success, failed);

        function success() {
          console.log("Shift Updated successfully");
          $scope.shiftUpdateSuccess = true;         //for error message
          $timeout(function () {
            $scope.cancel();
            // $state.go("view_shifts",{},{'reload':true});
          }, 1000)
        };

        function failed() {
          $scope.shiftUpdateFailed = true;         //for error message
          $timeout(function () {
            $scope.cancel();
            // $state.go("view_shifts",{},{'reload':true});
          }, 1000)
        };

      };

      $scope.cancel = function () {
        $uibModalInstance.close();
        $state.go("view_shifts",{},{'reload':true});
      }
    }]);

