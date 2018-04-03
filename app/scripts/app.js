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
  .config(function ($stateProvider) {
    $stateProvider
      .state('otherwise', {
        url: '*path',
        templateUrl: 'views/welcome.html',
      })
      .state('home', {
        url: '/',
        templateUrl: 'views/welcome.html'
      })

      .state('view_salary', {
        url: '/view_salary',
        templateUrl: 'views/viewSal.html',
        controller: 'viewSalCtrl',
        // controllerAs: 'salary'
      })
      .state('create_desig', {
        url: '/create_desig',
        templateUrl: 'views/createDesig.html',
        controller: 'createDesigCtrl',
      })
      .state('view_desig', {
        url: '/view_desig',
        templateUrl: 'views/viewDesig.html',
        controller: 'viewDesigCtrl',
      })
      .state('view_shifts', {
        url: '/view_shifts',
        templateUrl: 'views/viewShifts.html',
        controller: 'viewShiftsCtrl',
      })
      .state('create_emp', {
        url: '/create_emp',
        templateUrl: 'views/createEmployee.html',
        controller: 'createEmpCtrl',
        params: {
          type: 'new',
          id: 0
        }
      })
      .state('view_emp', {
        url: '/view_emp',
        templateUrl: 'views/viewEmployee.html',
        controller: 'viewEmpCtrl',
        params: {
          type: 'new',
          id: 0
        }
      })
      .state('take_attendance', {
        url: '/take_attendance',
        templateUrl: 'views/takeAttendance.html',
        controller: 'takeAttendanceCtrl',
      })
      .state('create_settings', {
        url: '/create_settings',
        templateUrl: 'views/createSettings.html',
        controller: 'createSettingsCtrl',
      })
      .state('view_settings', {
        url: '/view_settings',
        templateUrl: 'views/viewSettings.html',
        controller: 'viewSettingsCtrl',
      })
      .state('reports', {
        url: '/reports',
        templateUrl: 'views/viewReports.html',
        controller: 'viewReportsCtrl',
      })

  });
