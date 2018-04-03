'use strict';

angular.module("hrmsAngularjsApp")
	.controller("createSettingsCtrl", ['$scope', '$timeout', '$state','$uibModalInstance','editMode','settingToEdit', 'SettingsServ',
		function ($scope, $timeout, $state, $uibModalInstance, editMode, settingToEdit, SettingsServ) {

			$scope.editMode = editMode;					//to check that user wants to edit setting comp. or not

			if (editMode)
				$scope.setting = settingToEdit;						//for editing the setting comp.
			else
				$scope.setting = {};											//for creating a new setting component

			$scope.saveSetting = function () {						//to save a new setting component

				SettingsServ.saveSetting($scope.setting)
				.then(success, failed)

				function success() {
					console.log("Setting Added successfully");
					$scope.settingSuccess = true;         //for error message
					$timeout(function () {
						$scope.cancel();
					}, 1000)
				};

				function failed() {
					$scope.settingFailed = true;         //for error message
					$timeout(function () {
						$scope.cancel();
					}, 1000)
				};

			}


			//for updating an existing setting component
			$scope.updateSetting = function (setting) {

				SettingsServ.editSetting(setting)
					.then(success, failed);

				function success() {
					console.log("Setting Updated successfully");
					$scope.settingUpdateSuccess = true;         //for error message
					$timeout(function () {
						$scope.cancel();
					}, 1000)
				};

				function failed() {
					$scope.settingUpdateFailed = true;         //for error message
					$timeout(function () {
						$scope.cancel();
					}, 1000)
				};
				
			};

			$scope.cancel = function() {
				$uibModalInstance.close();
				$state.go("view_settings",{},{'reload':true});
			}

		}]);

