'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);


phonecatControllers.controller('headerController',['$scope','broadcaster',function ($scope,broadcaster){

 $scope.plasticRecycledQty=3;
 $scope.chartdata =[
          ['Label', 'Value'],
          ['CO2', 4],
          ['Plastic', 55],
          ['Years', 68]
        ];
 
 $scope.$on('handleBroadcast', function() {
        $scope.plasticRecycledQty = broadcaster.itemsToRecycle;
    });        


}]);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Dechet',
  function($scope, Dechet) {
    $scope.phones = Dechet.query();
    $scope.orderProp = 'age';
  }]);

phonecatControllers.controller('DechetDetailCtrl', ['$scope','$routeParams', 'Dechet','$log','$rootScope' ,'broadcaster',
  function($scope, $routeParams, Dechet,$log,$rootScope,broadcaster) {
    $log.debug($routeParams.dechetId);
    $scope.qtyToRecycle=0;

    $scope.recycleItem = function (){
      broadcaster.broadcastRecycling( $scope.qtyToRecycle,$rootScope);
    }
    
    $scope.phone = Dechet.get({dechetId: $routeParams.dechetId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
      $scope.d3Data=phone.recycling_figures;
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }]);



