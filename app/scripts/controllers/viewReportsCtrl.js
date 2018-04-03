'use strict';

angular.module("hrmsAngularjsApp")
  .controller("viewReportsCtrl", ['ShiftsServ', 'EmployeeServ', 'AttendanceServ', 'SettingsServ', '$scope', '$timeout', '$state',
    function (ShiftsServ, EmployeeServ, AttendanceServ, SettingsServ, $scope, $timeout, $state) {

      //get all emp data
      EmployeeServ.getEmployee()
        .then(function (response) {
          $scope.employees = response.data;
        });

      //get all settings data
      SettingsServ.getSettings()
        .then(function (response) {
          $scope.settings = response.data;
        });

      //get all attendance data
      AttendanceServ.getAttendances()
        .then(function (response) {
          $scope.attendances = response.data;
        });

      ShiftsServ.getShifts()
        .then(function (response) {
          $scope.shifts = response.data;
        });

      $scope.reportData = {};

      $scope.viewReport = function () {
        var totalSal = parseInt($scope.empSelected.totalSal);
        var oneDaySal = totalSal / 24;

        var shiftStart, shiftEnd;
        for(let i=0; i<$scope.shifts.length; i++) {
          if($scope.shifts[i].name === $scope.empSelected.shiftName) {
            shiftStart = $scope.shifts[i].start;
            shiftEnd = $scope.shifts[i].end;
            break;
          }
        }

        var selAttendance = [];

        for(let i=0; i<$scope.attendances.length; i++) {
          if($scope.attendances[i].empId === $scope.empSelected.id) {
            selAttendance.push($scope.attendances[i]);
            break;
          }
        }





      }





    }]);

