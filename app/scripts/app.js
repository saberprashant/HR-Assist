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
        template: '<strong>Please, select from menu!</strong>',
      })
      .state('home', {
        url: '/',
        template: '<strong>Please, select from menu!</strong>'
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
        // controllerAs: 'salary'
      })
      .state('view_desig', {
        url: '/view_desig',
        templateUrl: 'views/viewDesig.html',
        controller: 'viewDesigCtrl',
        // controllerAs: 'salary'
      })
      .state('view_shifts', {
        url: '/view_shifts',
        templateUrl: 'views/viewShifts.html',
        controller: 'viewShiftsCtrl',
        // controllerAs: 'salary'
      })


  });
