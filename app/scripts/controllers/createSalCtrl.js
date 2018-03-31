'use strict';

angular.module("hrmsAngularjsApp")
	.controller("createSalCtrl", ['SalaryServ', '$scope', '$timeout', '$state','$uibModalInstance','editMode','salaryToEdit',
		function (SalaryServ, $scope, $timeout, $state, $uibModalInstance, editMode, salaryToEdit) {

			$scope.editMode = editMode;

			if (editMode)
				$scope.salary = salaryToEdit;						//for editing the salary comp.
			else
				$scope.salary = {};											//for creating a new salary component


			$scope.saveSal = function () {						//to save a new salary component

				SalaryServ.saveSalary($scope.salary)
				.then(success, failed)

				function success() {
					console.log("Salary Comp. Added successfully");
					$scope.salarySuccess = true;         //for error message
					$timeout(function () {
						$scope.cancel();
						// $state.go("view_salary",{},{'reload':true});
					}, 1000)
				};

				function failed() {
					$scope.salaryFailed = true;         //for error message
					$timeout(function () {
						$scope.cancel();
						// $state.go("view_salary",{},{'reload':true}); 
					}, 1000)
				};

			}


			//for updating an existing salary component
			$scope.updateSal = function (salary) {

				SalaryServ.editSalary(salary)
					.then(success, failed);

				function success() {
					console.log("Salary Comp. Updated successfully");
					$scope.salaryUpdateSuccess = true;         //for error message
					$timeout(function () {
						$scope.cancel();
						// $state.go("view_salary",{},{'reload':true});
					}, 1000)
				};

				function failed() {
					$scope.salaryUpdateFailed = true;         //for error message
					$timeout(function () {
						$scope.cancel();
						// $state.go("view_salary",{},{'reload':true});
					}, 1000)
				};
				
			};

			$scope.cancel = function() {
				$uibModalInstance.close();
				$state.go("view_salary",{},{'reload':true});
			}

		}]);

