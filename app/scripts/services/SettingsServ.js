'use strict';

angular.module("hrmsAngularjsApp")
  .factory("SettingsServ", ['$http',
    function ($http) {
      let obj = {
        saveSetting(setting) {
          return $http.post('/api/view_settings', setting);
        },

        editSetting(setting) {
          return $http.put('/api/view_settings/' + setting._id, setting);
        },

        getSettings() {
          return $http.get('/api/view_settings');
        },

        deleteSetting(id) {
          return $http.delete('/api/view_settings/' + id)
        }
      };

      return obj;
    }]);
