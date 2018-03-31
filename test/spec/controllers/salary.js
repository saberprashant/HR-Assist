'use strict';

describe('Controller: SalaryCtrl', function () {

  // load the controller's module
  beforeEach(module('hrmsAngularjsApp'));

  var SalaryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SalaryCtrl = $controller('SalaryCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SalaryCtrl.awesomeThings.length).toBe(3);
  });
});
