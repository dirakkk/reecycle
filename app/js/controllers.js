'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Dechet',
  function($scope, Dechet) {
    $scope.phones = Dechet.query();
    $scope.orderProp = 'age';
  }]);

phonecatControllers.controller('DechetDetailCtrl', ['$scope', '$routeParams', 'Dechet',
  function($scope, $routeParams, Dechet) {
    $scope.phone = Dechet.get({phoneId: $routeParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }]);

