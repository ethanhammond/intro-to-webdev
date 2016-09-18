/**
  * AUTHOR: EH (ethanhammond12099@gmail.com)
  * VERSION: 1.0
  * CREATED: 4.21.2015
  * ASSIGNMENT: Staff Directory
  */

(function() {
    "use strict";

    angular.module('staffApp')
        .controller('staffCtrl', MainCtrl);

    function MainCtrl($scope) {
        $scope.staff = populateStaff();
        $scope.filterByBuilding = function(building) {
            $scope.filterBuilding = building;
        };
    }
})();