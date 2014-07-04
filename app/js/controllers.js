'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);


phonecatControllers.controller('headerController',['$scope',function ($scope){

 $scope.plasticRecycledQty=3;
 $scope.chartdata =[
          ['Label', 'Value'],
          ['CO2', 4],
          ['Plastic', 55],
          ['Years', 68]
        ];
 
  //  $scope.$watch("plasticRecycledQty", function(newValue, oldValue) {
  //   console.log('CTRL:', newValue);
  // });

}]);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Dechet',
  function($scope, Dechet) {
    $scope.phones = Dechet.query();
    $scope.orderProp = 'age';
  }]);

phonecatControllers.controller('DechetDetailCtrl', ['$scope', '$routeParams', 'Dechet','$log',
  function($scope, $routeParams, Dechet,$log) {
    $log.debug($routeParams.dechetId);

    // //hard-code data
    // $scope.d3Data = [
    // {name: "EU recycling rate", score: 50},
    // {name: "CO2 rate of recycling", score: 80},
    // {name: 'Tons recycled/year in EU', score: 120},
    // {name: "Days to recycle", score: 40}
    // ];
    


    $scope.phone = Dechet.get({dechetId: $routeParams.dechetId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
      $scope.d3Data=phone.recycling_figures;
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }]);



