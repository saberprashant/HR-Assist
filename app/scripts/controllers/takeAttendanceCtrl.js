'use strict';

angular.module("hrmsAngularjsApp")
  .controller("takeAttendanceCtrl", ['AttendanceServ', 'EmployeeServ', '$scope', '$timeout', '$state',
    function (AttendanceServ, EmployeeServ, $scope, $timeout, $state, $uibModalInstance) {


        $scope.attendanceDate = new Date();

        //get employee data from db
        EmployeeServ.getEmployee()
        .then(function (response) {
          $scope.employees = response.data;
        });

        $scope.attendanceType='checkIn';
        $scope.checkInTime = new Date();
        $scope.checkOutTime =new Date();
    
        $scope.attendanceSuccess=false;
        $scope.attendanceFailed=false;
        $scope.errMsg="";
    
        $scope.takeAttendance = function(){
            var year=$scope.attendanceDate.getFullYear();
            var month=$scope.attendanceDate.getMonth();
            var day=$scope.attendanceDate.getDate();
            
            var employeeId=$scope.empSelected.id;
            var params={'year':year,'month':month,'day':day,'employeeId':employeeId};
            
            var data={};
    
            data.type=$scope.attendanceType;
            if($scope.attendanceType==='checkIn'){
                data.time=$scope.checkInTime;
            }
            else{
                data.time=$scope.checkOutTime;
            }
    
            var response=attendance(params,data);
            if(response=='success'){
                $scope.attendanceSuccess=true;
            }
            else{
                $scope.attendanceFailed=true;
                $scope.errMsg=response;
            }
    
            $timeout(function(){
                $state.go("home");
            },2000);
    
        };
    
    }
  ]);
