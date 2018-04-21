'use strict';

angular.module("hrmsAngularjsApp")
	.controller("viewDesigReportCtrl", ['DesigReport', '$scope',
		function (DesigReport, $scope) {

      $scope.desigReport = DesigReport.data;
      console.log($scope.desigReport);

		}]);

