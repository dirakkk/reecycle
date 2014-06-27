'use strict';

/* Services */

var phonecatServices = angular.module('phonecatServices', ['ngResource']);

phonecatServices.factory('Dechet', ['$resource',
  function($resource){
    return $resource('dechets/:dechetId.json', {}, {
      query: {method:'GET', params:{dechetId:'dechets2'}, isArray:true}
    });
  }]);
