'use strict';

angular.module("hrmsAngularjsApp")
  .factory("AttendanceServ", ['$http',
    function ($http) {
      let obj = {
        saveAttendance(attendance) {
          return $http.post('http://localhost:3000/attendances', attendance);
        },

        editAttendance(attendance) {
          return $http.put('http://localhost:3000/attendances/' + attendance.id, attendance);
        },

        getAttendances() {
          return $http.get('http://localhost:3000/attendances');
        },

        deleteAttendance(id) {
          return $http.delete('http://localhost:3000/attendances/' + id)
        }
      };

      return obj;
    }]);
