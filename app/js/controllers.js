'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Dechet',
  function($scope, Dechet) {
    $scope.phones = Dechet.query();
    $scope.orderProp = 'age';
  }]);

phonecatControllers.controller('DechetDetailCtrl', ['$scope', '$routeParams', 'Dechet','$log',
  function($scope, $routeParams, Dechet,$log) {
    $log.debug($routeParams.dechetId);
    $scope.phone = Dechet.get({dechetId: $routeParams.dechetId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }]);

