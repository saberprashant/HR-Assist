'use strict';

angular.module("hrmsAngularjsApp")
  .factory("SettingsServ", ['$http',
    function ($http) {
      let obj = {
        saveSetting(setting) {
          return $http.post('/view_settings', setting);
        },

        editSetting(setting) {
          return $http.put('/view_settings/' + setting._id, setting);
        },

        getSettings() {
          return $http.get('/view_settings');
        },

        deleteSetting(id) {
          return $http.delete('/view_settings/' + id)
        }
      };

      return obj;
    }]);
