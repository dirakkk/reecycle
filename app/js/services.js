	'use strict';

	/* Services */

	var phonecatServices = angular.module('phonecatServices', ['ngResource','d3AngularApp']);

	phonecatServices.factory('Dechet', ['$resource','$log',
		function($resource){
			return $resource('dechets/:dechetId.json', {}, {
				query: {method:'GET', params:{dechetId:'dechets2'}, isArray:true}
			});
		}]);

	//the service to broadcast changes between ctrlers
	phonecatServices.factory('broadcaster', ['$rootScope',
		function($rootScope){

			var sharedService = {};
			sharedService.itemsToRecycle =0;

			sharedService.broadcastRecycling = function  (nbItems,$rootScope) {
				this.itemsToRecycle=nbItems;	
				$rootScope.$broadcast('handleBroadcast');
			};

			return sharedService;

		}
		]);



	//injecting the D3 methods !!!
	var d3Services = angular.module('d3', []);
	d3Services.factory('d3Service', ['$document', '$q', '$rootScope',
		function($document, $q, $rootScope) {
			var d = $q.defer();
			function onScriptLoad() {
	        // Load client in the browser
	        $rootScope.$apply(function() { d.resolve(window.d3); });
	    }
	      // Create a script tag with d3 as the source
	      // and call our onScriptLoad callback when it
	      // has been loaded
	      var scriptTag = $document[0].createElement('script');
	      scriptTag.type = 'text/javascript'; 
	      scriptTag.async = true;
	      scriptTag.src = 'http://d3js.org/d3.v3.min.js';
	      scriptTag.onreadystatechange = function () {
	      	if (this.readyState == 'complete') onScriptLoad();
	      }
	      scriptTag.onload = onScriptLoad;

	      var s = $document[0].getElementsByTagName('body')[0];
	      s.appendChild(scriptTag);

	      return {
	      	d3: function() { return d.promise; }
	      };
	  }]);

	