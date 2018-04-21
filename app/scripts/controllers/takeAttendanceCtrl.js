'use strict';

angular.module("hrmsAngularjsApp")
  .controller("takeAttendanceCtrl", ['AttendanceServ', 'EmployeeServ', '$scope', '$timeout', '$state', 'EmpData', 'ShiftData', 'OvertimeData', 'SettingData',
    function (AttendanceServ, EmployeeServ, $scope, $timeout, $state, EmpData, ShiftData, OvertimeData, SettingData) {

      //get employee data from db
      // EmployeeServ.getEmployee()
      //   .then(function (response) {
      //     $scope.employees = response.data;
      //   });

      $scope.employees = EmpData.data;
      $scope.shifts = ShiftData.data;
      $scope.empAttendance = {};
      $scope.empAttendance.attendanceDate = new Date();
      $scope.settings = SettingData.data;
      // $scope.attendances = AttendanceData.data;
      $scope.overtimeAllowance = OvertimeData.data[0].allowance;

      $scope.checkInTime = new Date();
      $scope.checkOutTime = new Date();

      $scope.attendanceSuccess = false;
      $scope.attendanceFailed = false;
      $scope.errMsg = "";


      $scope.takeAttendance = function () {
        // var year = $scope.attendanceDate.getFullYear();
        // var month = $scope.attendanceDate.getMonth();
        // var day = $scope.attendanceDate.getDate();

        $scope.empAttendance.empId = $scope.empSelected._id;

        //Adding employee attendance to db
        if ($scope.empAttendance.empId) {

          $scope.empAttendance.empName = $scope.empSelected.firstName;
          $scope.empAttendance.employee = $scope.empSelected;
          $scope.empAttendance.checkInTime = $scope.checkInTime;
          $scope.empAttendance.checkOutTime = $scope.checkOutTime;


          /* Work for aggregation of salary components based of total amount contributing to each component
          So, for that, we will find the salary distribution for each salary component (like overtime, deduction)
          after marking attendance for each user. So, by this we can do the aggregation easily.
          */
          //savind emp shift in emp attendance
          // for (let i = 0; i < $scope.shifts.length; i++) {
          //   if ($scope.shifts[i]._id === $scope.empSelected.shiftId) {
          //     $scope.empAttendance.shift = $scope.shifts[i];
          //   }
          // }

          // $scope.empAttendance.totalSal = $scope.empSelected.totalSal;
          // $scope.empAttendance.oneDaySal = parseInt($scope.empAttendance.totalSal / 24);

          // $scope.shiftStart = new Date($scope.empAttendance.shift.start);
          // $scope.shiftEnd = new Date($scope.empAttendance.shift.end);
          // var shiftStartMins = ($scope.shiftStart.getHours() * 60) + $scope.shiftStart.getMinutes();
          // var shiftEndMins = ($scope.shiftEnd.getHours() * 60) + $scope.shiftEnd.getMinutes();
          // console.log('shift start mins- ', shiftStartMins, ' --- shift end mins- ', shiftEndMins);

          // var startTimeDiffMins = shiftStartMins - (( $scope.empAttendance.checkInTime.getHours() * 60) + $scope.empAttendance.checkInTime.getMinutes() );   //in minutes
          // var endTimeDiffMins = shiftEndMins - (( $scope.empAttendance.checkOutTime.getHours() * 60) + $scope.empAttendance.checkOutTime.getMinutes() );      //in minutes
          // console.log('startTimeDiffMins ->', startTimeDiffMins, '--endTimeDiffMins ->', endTimeDiffMins);

          // var lateMins, overtimeMins;

          // if(startTimeDiffMins < 0 && endTimeDiffMins > 0) {    //total late time
          //   lateMins = Math.abs(startTimeDiffMins) + endTimeDiffMins;
          //   overtimeMins = 0;
          // } else if(startTimeDiffMins > 0 && endTimeDiffMins < 0) {   //total overtime 
          //   overtimeMins = startTimeDiffMins + Math.abs(endTimeDiffMins);
          //   lateMins = 0;
          // }
          // else if(startTimeDiffMins < 0 && endTimeDiffMins > 0) {   // late coming
          //   lateMins = Math.abs(startTimeDiffMins);
          //   overtimeMins = Math.ans
          // } else if(startTimeDiffMins > 0 && endTimeDiffMins < 0) {

          // }



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
        }
        else {
          $scope.attendanceFailed = true;
          $scope.errMsg = "Make sure you enter employee name."
        }
      }



    }
  ]);

