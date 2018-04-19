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
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('requestInterceptor');

    function redirectIfNotAuthorized($state, AuthServ) {
      if (!AuthServ.checkAuthorized()) {
        $state.go("login");
        return false;
      }
      return true;
    }

    $stateProvider

      .state('login', {
        url: '/',
        templateUrl: 'views/login.html',
        controller: 'loginCtrl',
      })
      // .state('otherwise', {
      //   url: '*path',
      //   templateUrl: 'views/welcome.html',
      // })
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
        resolve: {
          authorized: redirectIfNotAuthorized
        }
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
          authorized: redirectIfNotAuthorized
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
        resolve: {
          authorized: redirectIfNotAuthorized
        }
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
          authorized: redirectIfNotAuthorized
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
          authorized: redirectIfNotAuthorized
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
        resolve: {
          authorized: redirectIfNotAuthorized
        }
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
          authorized: redirectIfNotAuthorized
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
          authorized: redirectIfNotAuthorized
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
        resolve: {
          authorized: redirectIfNotAuthorized
        }
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
          authorized: redirectIfNotAuthorized
        }
      })
      .state('home.reports', {
        url: '/reports',
        views: {
          'dashView': {
            templateUrl: 'views/viewReports.html',
            controller: 'viewReportsCtrl',
          }
        },
        resolve: {
          authorized: redirectIfNotAuthorized
        }
      })


  });
