angular.module("hrmsAngularjsApp")
  .directive("salaryNameCheckDirec", ['SalaryServ', '$q', '$timeout',
    function (SalaryServ, $q, $timeout) {
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
          ctrl.$asyncValidators.nameAvailable = function (modelValue, viewValue) {
            if (attrs.oldname == undefined)
              attrs.oldname = "";

              
            var def = $q.defer();
            SalaryServ.getSalaries()                //to get all salaries from db
              .then(function (response) {
                var salaryComponents = response.data;
                console.log(salaryComponents);
                return response.data;
              })
              .then(function (salaryComponents) {
                var matchFound = false;
                for (let i = 0; i < salaryComponents.length; i++) {
                  if (salaryComponents[i].name.toLowerCase() == viewValue.toLowerCase() 
                  && salaryComponents[i].name.toLowerCase() != attrs.oldname.toLowerCase()) {
                    console.log('loop');
                    matchFound = true;
                    // return true;
                    def.reject();
                    // $timeout(function(){           to check if error exists
                    //   def.reject();
                    // }, 5000);
                    
                  }

                }
                console.log('loop out');
                // return false;     
                if(!matchFound)
                  def.resolve();
                // $timeout(function(){       to check if error exists
                //   def.resolve();  
                // }, 5000)
                           
              });
              return def.promise;

            // var pr = salaryComponents.$promise;
            // var def = $q.defer();
            // var matchFound = false;
            // pr.then(
            //   function () {
            //     for (let i = 0; i < salaryComponents.length; i++) {
            //       if (salaryComponents[i].name.toLowerCase() == viewValue.toLowerCase() && salaryComponents[i].name.toLowerCase() != attrs.oldname.toLowerCase()) {
            //         def.reject();
            //         matchFound = true;
            //       }

            //     }
            //     if (!matchFound)
            //       def.resolve();
            //   }
            // );

            // return def.promise;
          // });




          }
        }
      }
    }]);