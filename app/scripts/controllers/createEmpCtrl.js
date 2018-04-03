'use strict';

angular.module("hrmsAngularjsApp")
  .controller("createEmpCtrl", ['SalaryServ', 'DesignationServ', 'ShiftsServ', 'EmployeeServ', '$scope',
    '$timeout', '$state', '$stateParams',
    function (SalaryServ, DesignationServ, ShiftsServ, EmployeeServ, $scope, $timeout, $state, $stateParams) {


      //get all available salary components
      SalaryServ.getSalaries()
        .then(function (response) {
          $scope.allAvailableSalaries = response.data;
        });

      //get all designations from db
      DesignationServ.getDesig()
        .then(function (data) {
          $scope.designations = data;
        });

      //get all shifts fromm db
      ShiftsServ.getShifts()
        .then(function (response) {
          $scope.shifts = response.data;
        });



      if ($stateParams.type == 'new') {                 //if user want to create new employee
        $scope.emp = {};
        $scope.buttonText = "Add New Employee";
        $scope.formHeading = "Create New Employee";
        $scope.emp.cAddress = {};
        $scope.emp.cAddress.sameAsPermanent = false;
        $scope.selectedSalaries = [];

      }
      else if ($stateParams.type == 'edit') {           //if user want to edit employee details
        //get employee data from db for a particular id(employee needs to be edited)
        EmployeeServ.getEmployeeWithId({ 'id': $stateParams.id })
          .then(function (response) {
            console.log('Inside getEmployeeWithId', response.data);
            $scope.emp = response.data;
            $scope.selectedSalaries = $scope.emp.salaryStructure;
            $scope.designation = $scope.designations[$scope.emp.designationId];

            //Set basic amount which was set at time of creating a new employee
            $scope.basicAmount = $scope.selectedSalaries[$scope.selectedSalaries.length - 1].amount;
            $scope.selectedSalaries.splice($scope.selectedSalaries.length - 1, 1);

            $scope.changeAvailableSalaries();

            $scope.buttonText = "Update Employee Data";
            $scope.formHeading = "Edit Employee"
          });

      }


      $scope.employeeSuccess = false;
      $scope.employeeFailed = false;
      $scope.employeeUpdateSuccess = false;
      $scope.empleeUpdateFailed = false;



      $scope.getDesigSalaryStructure = function () {

        //getting salary components for designation selected from model=designationIndex
        // $scope.selectedSalaries = $scope.designations[$scope.designationIndex].salaryStructure;
        $scope.selectedSalaries = $scope.designation.salaryStructure;
        $scope.emp.designationName = $scope.designation.name;

        //set basic amount which was set at time of creating designation (for new emp)
        $scope.basicAmount = $scope.selectedSalaries[$scope.selectedSalaries.length - 1].amount;
        $scope.selectedSalaries.splice($scope.selectedSalaries.length - 1, 1);


        //set up thr id of designations in emp
        $scope.emp.designationId = $scope.designation.id;
        console.log('update getDesigSalaryStructure');
        console.log($scope.selectedSalaries);
        $scope.changeAvailableSalaries();
      };




      $scope.changeAvailableSalaries = function () {
        $scope.availableSalaries = $scope.allAvailableSalaries;

        console.log('inside changeAvailableSalaries');

        // common for both edit employee and for new employee
        var availSalariesForEmp = [];       //available salaries for employee = (all available Salaries - selected 
        //                                   salaries of designation)
        var match = false;
        for (let i = 0; i < $scope.availableSalaries.length; i++) {
          match = false;
          for (let j = 0; j < $scope.selectedSalaries.length; j++) {
            if ($scope.selectedSalaries[j].name === $scope.availableSalaries[i].name) {
              match = true;
              break;
            }
          }
          if (!match)
            availSalariesForEmp.push($scope.availableSalaries[i])
        };
        $scope.availableSalaries = availSalariesForEmp;
        $scope.updateTotal();
      };




      $scope.updateTotal = function () {
        console.log('Inside update total');

        $timeout(function () {
          $scope.total = parseInt($scope.basicAmount);
          for (let i = 0; i < $scope.selectedSalaries.length; i++) {

            console.log($scope.selectedSalaries[i]);
            if ($scope.selectedSalaries[i].type == 'allowance') {
              if ($scope.selectedSalaries[i].inputType == 'percentage') {
                $scope.total = parseInt($scope.total) + parseInt($scope.selectedSalaries[i].percentage) * parseInt($scope.basicAmount) / 100;
              }
              else
                $scope.total = parseInt($scope.total) + parseInt($scope.selectedSalaries[i].amount);

            }
            else {
              if ($scope.selectedSalaries[i].inputType == 'percentage') {
                $scope.total = parseInt($scope.total) - parseInt($scope.selectedSalaries[i].percentage) * parseInt($scope.basicAmount) / 100;
              }
              else
                $scope.total = parseInt($scope.total) - parseInt($scope.selectedSalaries[i].amount);
            }
          }
        }, 500);
      };

      // //Set total to basic amount initially
      // $scope.total = parseInt($scope.basicAmount);


      //function to add a new employee in db
      $scope.addEmployee = function () {
        $scope.emp.salaryStructure = $scope.selectedSalaries;

        if ($scope.emp.cAddress.sameAsPermanent) {
          $scope.emp.cAddress = $scope.emp.pAddress;
        }

        let basic = { 'name': 'basic', 'type': 'allowance', 'amount': $scope.basicAmount }
        $scope.emp.salaryStructure.push(basic);


        if ($stateParams.type == 'new') {
          //save emp object in db for employees
          EmployeeServ.saveEmployee($scope.emp)
            .then(success, failed).finally(function () {
              $timeout(function () {
                $state.go("view_emp");
              }, 2000);
            });

          function success(data) {
            $scope.employeeSuccess = true;
            console.log("Success");
          };

          function failed(data) {
            $scope.employeeFailed = true;
            console.log("Failed");
          };
        }

        else if ($stateParams.type == 'edit') {
          //update emp with edited data in db for employees
          EmployeeServ.editEmployee($scope.emp)
            .then(success, failed).finally(function () {
              $timeout(function () {
                $state.go("view_emp");
              }, 2000);
            });

          function success() {
            $scope.employeeUpdateSuccess = true;
            console.log('employeeUpdateSuccess');
          }

          function failed() {
            $scope.employeeUpdateFailed = true;
            console.log('employeeUpdateFailed');
          }
        }
      };

      //Remove item from selected salaries
      $scope.remove = function (id) {
        for (let i = 0; i < $scope.selectedSalaries.length; i++) {
          if ($scope.selectedSalaries[i].id === id) {
            $scope.availableSalaries.push($scope.selectedSalaries[i])
            $scope.selectedSalaries.splice(i, 1);
          }
        }
        $scope.updateTotal();
      };

    }]);

