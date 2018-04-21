'use strict';

/**
 * @ngdoc overview
 * @name hrmsAngularjsApp
 * @description
 * # hrmsAngularjsApp
 *
 * Main module of the application.
 */
angular
  .module('hrmsAngularjsApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'dndLists'
  ])



  // Routes
  .config(function ($stateProvider, $locationProvider, $httpProvider) {
    // $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('requestInterceptor');

    function redirectIfNotAuthorized($state, AuthServ) {
      if (!AuthServ.checkAuthorized()) {
        $state.go("login",{},{reload: true});
        return false;
      }
      return true;
    }

    function getSalaryData(SalaryServ) {
      return SalaryServ.getSalaries()                //to get all salaries from db
    }

    function getDesigData(DesignationServ) {
      return DesignationServ.getDesig()
    }

    function getShiftData(ShiftsServ) {
      return ShiftsServ.getShifts()
    }

    function getEmpData(EmployeeServ) {
      return EmployeeServ.getEmployee()
    }

    function getSettingData(SettingsServ) {
      return SettingsServ.getSettings()                //to get all settings from db
    }

    function getOvertimeData(OvertimeServ) {
      return OvertimeServ.getOvertime()
    }

    function getAttendanceData(AttendanceServ) {
      return AttendanceServ.getAttendances()
    }

    function getDesigWiseReport(EmployeeServ) {
      return EmployeeServ.getDesigWiseReport()
    }

    function getReportData() {
      let obj = {
        ShiftData : getShiftData,
        EmpData : getEmpData,
        SettingData : getSettingData,
        AttendanceData: getAttendanceData,
        OvertimeData: getOvertimeData,
      }
      return obj;
    }

    $stateProvider

      .state('login', {
        url: '/',
        templateUrl: 'views/login.html',
        controller: 'loginCtrl',
      })
      .state('otherwise', {
        redirectTo: 'home.dashboard' 
      })
      .state('home', {
        url: '/home',
        templateUrl: 'views/dashboard.html',
        resolve: {
          authorized: redirectIfNotAuthorized
        }
      })
      .state('home.dashboard', {
        url: '/dashboard',
        views: {
          'dashView': {
            templateUrl: 'views/welcome.html',
          }
        },

      })
      .state('home.view_salary', {
        url: '/view_salary',
        views: {
          'dashView': {
            templateUrl: 'views/viewSal.html',
            controller: 'viewSalCtrl',
          }
        },
        resolve: {
          // authorized: redirectIfNotAuthorized
          SalaryData : getSalaryData
        }
      })
      .state('home.create_desig', {
        url: '/create_desig',
        views: {
          'dashView': {
            templateUrl: 'views/createDesig.html',
            controller: 'createDesigCtrl',
          }
        },
      })
      .state('home.view_desig', {
        url: '/view_desig',
        views: {
          'dashView': {
            templateUrl: 'views/viewDesig.html',
            controller: 'viewDesigCtrl',
          }
        },
        resolve: {
          // authorized: redirectIfNotAuthorized
          DesigData : getDesigData
        }
      })
      .state('home.view_shifts', {
        url: '/view_shifts',
        views: {
          'dashView': {
            templateUrl: 'views/viewShifts.html',
            controller: 'viewShiftsCtrl',
          }
        },
        resolve: {
          // authorized: redirectIfNotAuthorized
          ShiftData : getShiftData
        }
      })
      .state('home.create_emp', {
        url: '/create_emp',
        views: {
          'dashView': {
            templateUrl: 'views/createEmployee.html',
            controller: 'createEmpCtrl',
          }
        },
        params: {
          type: 'new',
          id: 0
        },
      })
      .state('home.view_emp', {
        url: '/view_emp',
        views: {
          'dashView': {
            templateUrl: 'views/viewEmployee.html',
            controller: 'viewEmpCtrl',
          }
        },
        resolve: {
          // authorized: redirectIfNotAuthorized
          EmpData : getEmpData
        }
      })
      .state('home.take_attendance', {
        url: '/take_attendance',
        views: {
          'dashView': {
            templateUrl: 'views/takeAttendance.html',
            controller: 'takeAttendanceCtrl',
          }
        },
        resolve: {
          authorized: redirectIfNotAuthorized,
          EmpData : getEmpData,
          ShiftData : getShiftData,
          OvertimeData: getOvertimeData,
          SettingData: getSettingData
        }
      })
      .state('home.create_settings', {
        url: '/create_settings',
        views: {
          'dashView': {
            templateUrl: 'views/createSettings.html',
            controller: 'createSettingsCtrl',
          }
        },

      })
      .state('home.view_settings', {
        url: '/view_settings',
        views: {
          'dashView': {
            templateUrl: 'views/viewSettings.html',
            controller: 'viewSettingsCtrl',
          }
        },
        resolve: {
          // authorized: redirectIfNotAuthorized
          SettingData : getSettingData,
          OvertimeData: getOvertimeData
        }
      })
      .state('home.employee_report', {
        url: '/employee/report',
        views: {
          'dashView': {
            templateUrl: 'views/viewReports.html',
            controller: 'viewReportsCtrl',
          }
        },
        resolve: {
          // authorized: redirectIfNotAuthorized
          EmpData : getEmpData,
          ShiftData: getShiftData,
          AttendanceData: getAttendanceData,
          OvertimeData: getOvertimeData,
          SettingData: getSettingData,
          DesigReport: getDesigWiseReport
        }
      })
      .state('home.desig_report', {
        url: '/desig/report',
        views: {
          'dashView': {
            templateUrl: 'views/viewDesigReport.html',
            controller: 'viewDesigReportCtrl',
          }
        },
        resolve: {
          // authorized: redirectIfNotAuthorized
          DesigReport: getDesigWiseReport
        }
      })


  });
