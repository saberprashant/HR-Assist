'use strict';

angular.module("hrmsAngularjsApp")
  .controller("takeAttendanceCtrl", ['AttendanceServ', 'EmployeeServ', '$scope', '$timeout', '$state',
    function (AttendanceServ, EmployeeServ, $scope, $timeout, $state) {


      //get employee data from db
      EmployeeServ.getEmployee()
        .then(function (response) {
          $scope.employees = response.data;
        });

      $scope.empAttendance = {}
      $scope.empAttendance.attendanceDate = new Date();

      $scope.checkInTime = new Date();
      $scope.checkOutTime = new Date();

      $scope.attendanceSuccess = false;
      $scope.attendanceFailed = false;
      $scope.errMsg = "";

      $scope.takeAttendance = function () {
        // var year = $scope.attendanceDate.getFullYear();
        // var month = $scope.attendanceDate.getMonth();
        // var day = $scope.attendanceDate.getDate();

        $scope.empAttendance.empId = $scope.empSelected.id;
        $scope.empAttendance.empName = $scope.empSelected.firstName;

        $scope.empAttendance.checkInTime = $scope.checkInTime;
        $scope.empAttendance.checkOutTime = $scope.checkOutTime;

        //Adding employee attendance to db
        if ($scope.empAttendance.empId) {
          AttendanceServ.saveAttendance($scope.empAttendance)
            .then(success, failed).finally(function () {
              $timeout(function () {
                $state.go("home");
              }, 2000);
            });

          function success(response) {
            console.log("Attendance added successfully");
            console.log(response.data)
            $scope.attendanceSuccess = true;
          }

          function failed(response) {
            $scope.attendanceFailed = true;
            $scope.errMsg = response;
          }
        } else {
          $scope.attendanceFailed = true;
          $scope.errMsg = "Make sure you entered employee name."
        }


      };

    }
  ]);

