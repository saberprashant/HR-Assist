'use strict';

angular.module("hrmsAngularjsApp")
  .controller("viewReportsCtrl", ['OvertimeServ','ShiftsServ', 'EmployeeServ', 'AttendanceServ', 'SettingsServ', '$scope', '$timeout', '$state',
    function (OvertimeServ, ShiftsServ, EmployeeServ, AttendanceServ, SettingsServ, $scope, $timeout, $state) {

      $scope.showReport = false;
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


      $scope.viewReport = function () {
        $scope.reportData = [];
        var totalSal = parseInt($scope.empSelected.totalSal);
        var oneDaySal = parseInt(totalSal / 24);

        var shiftStart, shiftEnd, shiftStartHours, shiftEndHours;
        for (let i = 0; i < $scope.shifts.length; i++) {
          if ($scope.shifts[i].name === $scope.empSelected.shiftName) {
            $scope.shiftStart = new Date($scope.shifts[i].start);
            $scope.shiftEnd = new Date($scope.shifts[i].end);
            shiftStartHours = $scope.shiftStart.getHours();
            shiftEndHours = $scope.shiftEnd.getHours();
            console.log('shift start- ', shiftStartHours, ' --- shift end- ', shiftEndHours);
            break;
          }
        }

        for (let i = 0; i < $scope.attendances.length; i++) {
          var report = {};

          if ($scope.attendances[i].empId === $scope.empSelected.id) {
            report.attendanceDate = new Date($scope.attendances[i].attendanceDate);
            report.checkInTime = new Date($scope.attendances[i].checkInTime);
            report.checkOutTime = new Date($scope.attendances[i].checkOutTime);
            report.oneDaySal = oneDaySal;

            console.log('emp id', $scope.attendances[i].empId);
            console.log('checkin time', report.checkInTime.getHours());
            console.log('checkout time', report.checkOutTime.getHours());

            var startTimeDiff = (shiftStartHours - report.checkInTime.getHours()) * 60;
            var endTimeDiff = (shiftEndHours - report.checkOutTime.getHours()) * 60;
            var startTimeDiffHours = shiftStartHours - report.checkInTime.getHours();
            var endTimeDiffHours = shiftEndHours - report.checkOutTime.getHours();

            console.log('startTimeDiff', startTimeDiff);
            console.log('endTimeDiff', endTimeDiff);

            var deduction = 0, overtime = 0;
            var finalDaySal = oneDaySal;


            if (startTimeDiff < 0) {        //came late - deduction (start)
              var positive = startTimeDiff * (-1);
              for (let j = 0; j < $scope.settings.length; j++) {
                if (parseInt($scope.settings[j].timeVal) >= positive) {
                  deduction = deduction + parseInt($scope.settings[j].deduction);
                  finalDaySal = finalDaySal - parseInt($scope.settings[j].deduction);
                  console.log('1', deduction, finalDaySal);
                  break;
                }
              }
            }
            else if (startTimeDiff > 0) {     //early start - overtime (start)
              for (let j = 0; j < $scope.settings.length; j++) {
                if ($scope.settings[j].name == "Overtime") {
                  overtime = overtime + (parseInt($scope.settings[j].deduction) * startTimeDiffHours);
                  finalDaySal = finalDaySal + (parseInt($scope.settings[j].deduction) * startTimeDiffHours);
                  console.log('2', overtime, finalDaySal);
                  break;
                }
              }
            }

            if (endTimeDiff < 0) {        //working late - overtime (end)
              endTimeDiffHours *= -1;
              for (let j = 0; j < $scope.settings.length; j++) {
                if ($scope.settings[j].name == "Overtime") {
                  overtime = overtime + (((parseInt($scope.settings[j].deduction))) * endTimeDiffHours);
                  finalDaySal = finalDaySal + (((parseInt($scope.settings[j].deduction))) * endTimeDiffHours);
                  console.log('3', overtime, finalDaySal);

                  break;
                }
              }
            }
            else if (endTimeDiff > 0) {      //left early - deduction (end)
              for (let j = 0; j < $scope.settings.length; j++) {
                if (parseInt($scope.settings[j].timeVal) >= startTimeDiff) {
                  deduction = deduction + parseInt($scope.settings[j].deduction);
                  finalDaySal = finalDaySal - parseInt($scope.settings[j].deduction);
                  console.log('4', deduction, finalDaySal);

                  break;
                }
              }
            }


            report.deduction = deduction;
            report.overtime = overtime;
            report.finalDaySal = finalDaySal;

            console.log('deduction', report.deduction);
            console.log('overtime', report.overtime);
            console.log('final day sal', report.finalDaySal);

            // var diffMs = (shiftStart - report.checkInTime);
            // var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
            // console.log('minutes diff', diffMins);
            console.log('loop', i);
            console.log('');
            $scope.reportData.push(report);         //push report for a date to reportData array for a employee
          }
        }

        console.log($scope.reportData);
        console.log('Change');

        $scope.showReport = true;
      }

    }]);

