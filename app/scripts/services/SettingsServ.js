'use strict';

angular.module("hrmsAngularjsApp")
  .factory("SettingsServ", ['$http',
    function ($http) {
      let obj = {
        saveSetting(setting) {
          return $http.post('http://localhost:3000/settings', setting);
        },

        editSetting(setting) {
          return $http.put('http://localhost:3000/settings/' + setting.id, setting);
        },

        getSettings() {
          return $http.get('http://localhost:3000/settings');
        },

        deleteSetting(id) {
          return $http.delete('http://localhost:3000/settings/' + id)
        }
      };

      return obj;
    }]);
