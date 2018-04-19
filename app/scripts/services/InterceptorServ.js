angular.module("hrmsAngularjsApp").factory("requestInterceptor", function () {
  return {
    request: function (config) {

      //If user is authorized
      if (window.localStorage.getItem("authToken") != undefined) {
        config.headers.authorization = window.localStorage.getItem("authToken");
      }
      return config;
    }
  }
});