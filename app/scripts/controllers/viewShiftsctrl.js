'use strict';

angular.module("hrmsAngularjsApp")
  .controller("viewShiftsCtrl", ['ShiftsServ', '$document', '$scope', '$timeout', '$state', '$uibModal','ShiftData',
    function (ShiftsServ, $document, $scope, $timeout, $state, $uibModal, ShiftData) {

      //get resolved shifts data
      $scope.shifts = ShiftData.data;

      $scope.addShiftWindow = function (size, parentSelector) {
        var parentElem = parentSelector ?
          angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'views/createShifts.html',
          controller: 'createShiftsCtrl',
          size: size,
          appendTo: parentElem,
          resolve: {
            editMode: false,
            shiftToEdit: undefined
          }
        });
      }


      $scope.editShiftWindow = function (shift, size, parentSelector) {
        var parentElem = parentSelector ?
          angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'views/createShifts.html',
          controller: 'createShiftsCtrl',
          size: size,
          appendTo: parentElem,
          resolve: {
            editMode: true,
            shiftToEdit: shift
          }
        });
      }

      // ShiftsServ.getShifts()
      //   .then(function (response) {
      //     $scope.shifts = response.data;
      //   });
      // $scope.salaries = JSON.parse($scope.salaries)
      // if($scope.salaries)
      //  console.log($scope.salaries); 




      //Remove shift from saved shifts
      $scope.remove = function (id) {
        ShiftsServ.deleteShift(id)
          .then(success, failed);

        function success() {
          console.log("Shift deleted successfully");
          $scope.shiftDeleteSuccess = true;         //for error message
          $timeout(function () {
            $state.go("home.view_shifts",{},{'reload':true});
          }, 1000)
        };

        function failed() {
          $scope.shiftDeleteFailed = true;         //for error message
          $timeout(function () {
            $state.go("home.view_shifts",{},{'reload':true});
          }, 1000)
        };

      };


    }]);

