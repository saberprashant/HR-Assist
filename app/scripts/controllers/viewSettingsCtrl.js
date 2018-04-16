'use strict';

angular.module("hrmsAngularjsApp")
  .controller("viewSettingsCtrl", ['$document','OvertimeServ', 'SettingsServ', '$scope', '$timeout', '$state', '$uibModal',
    function ($document,OvertimeServ, SettingsServ, $scope, $timeout, $state, $uibModal) {



      SettingsServ.getSettings()                //to get all settings from db
        .then(function (response) {
          $scope.settings = response.data;
        });

      OvertimeServ.getOvertime()
      .then(function(response) {
        $scope.overtime = response.data[0];
        $scope.overtimeAllowance = $scope.overtime.allowance;
      })

      $scope.showEditOvertime = false;


      //to add new setting component
      $scope.addSettingWindow = function (size, parentSelector) {
        var parentElem = parentSelector ?
          angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'views/createSettings.html',
          controller: 'createSettingsCtrl',
          size: size,
          appendTo: parentElem,
          resolve: {
            editMode: false,
            settingToEdit: undefined
          }
        });
      }

      //to edit a setting commponent
      $scope.editSettingWindow = function (setting, size, parentSelector) {
        var parentElem = parentSelector ?
          angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'views/createSettings.html',
          controller: 'createSettingsCtrl',
          size: size,
          appendTo: parentElem,
          resolve: {
            editMode: true,
            settingToEdit: setting
          }
        });
      }


      //Remove setting component from saved setting components
      $scope.remove = function (id) {
        SettingsServ.deleteSetting(id)
          .then(success, failed);

        function success() {
          console.log("Setting deleted successfully");
          $scope.settingDeleteSuccess = true;         //for error message
          $timeout(function () {
            $state.go("view_settings",{},{'reload':true});
          }, 1000)
        };

        function failed() {
          $scope.settingDeleteFailed = true;         //for error message
          $timeout(function () {
            $state.go("view_settings",{},{'reload':true});
          }, 1000)
        };

      };

      $scope.editOvertime = function() {
        $scope.showEditOvertime = true;
      }

      $scope.saveOvertime = function() {
        $scope.overtime.name = "Overtime";
        OvertimeServ.editOvertime($scope.overtime)
        .then(function(response) {
          $scope.showEditOvertime = false;
          $state.go("view_settings",{},{'reload':true});
        });
      }

      $scope.editOvertimeCancel = function() {
        $scope.showEditOvertime = false;
      }



    }]);

