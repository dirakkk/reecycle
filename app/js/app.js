'use strict';

/* App Module */

var phonecatApp = angular.module('phonecatApp', [
  'ngRoute',
  'phonecatAnimations',
  'phonecatControllers',
  'phonecatFilters',
  'phonecatServices',
  'googleGauge'
]);

phonecatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/dechets', {
        templateUrl: 'partials/dechets-list.html',
        controller: 'PhoneListCtrl'
      }).
      when('/dechets/:dechetId', {
        templateUrl: 'partials/dechet-detail.html',
        controller: 'DechetDetailCtrl'
      }).
      otherwise({
        redirectTo: '/dechets'
      });
  }]);

