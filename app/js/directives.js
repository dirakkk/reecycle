'use strict';

/* Directives */

angular.module('d3AngularApp', ['d3'])
	.directive('d3Bars', ['$window', '$timeout','$log','d3Service', 
		function($window, $timeout, $log, d3Service) {
			return {
				restrict: 'EA',
				scope: {
					data: '='
				},
				link: function(scope, ele, attrs) {
					d3Service.d3().then(function(d3) {

						var renderTimeout;
						var margin = parseInt(attrs.margin) || 20,
						barHeight = parseInt(attrs.barHeight) || 20,
						barPadding = parseInt(attrs.barPadding) || 5;

						var svg = d3.select(ele[0])
						.append('svg')
						.style('width', '100%');

						$window.onresize = function($window) {scope.$apply();};

						// Watch for resize event
						scope.$watch(function() {
							return angular.element($window)[0].innerWidth;
						}, function() {
							scope.render(scope.data);
						});
						//watch for data modifications
						scope.$watch('data', function(newData) {
            				scope.render(newData);
          				}, true);

						scope.render = function(data) {
							$log.debug("in render");
    						svg.selectAll('*').remove();// remove all previous items before render
    						if (!data) return;// If we don't pass any data, return out of the element
    						// setup variables
    						var width = d3.select(ele[0]).node().offsetWidth - margin,
					        // calculate the height,scale and use the category20() scale function for multicolor support
					        height = scope.data.length * (barHeight + barPadding),
					        color = d3.scale.category20(),
					        xScale = d3.scale.linear().domain([0, d3.max(data, function(d) {return d.score;})]).range([0, width]);
					    	// set the height based on the calculations above
					    	svg.attr('height', height);
						    //create the rectangles for the bar chart
						    svg.selectAll('rect').data(data).enter().append('rect').attr('height', barHeight).attr('width', 140)
						    .attr('x', Math.round(margin/2)).attr('y', function(d,i) {
						    	return i * (barHeight + barPadding);
						    })
						    .attr('fill', function(d) { return color(d.score); })
						    .transition()
						    .duration(500)
						    .attr('width', function(d) {
						    	return xScale(d.score);
						    });
						    //set the text in the rectangles
						    svg.selectAll('text')
			                .data(data)
			                .enter()
			                  .append('text')
			                  .attr('fill', '#fff')
			                  .attr('y', function(d,i) {
			                    return i * (barHeight + barPadding) + 15;
			                  })
			                  .attr('x', 15)
			                  .text(function(d) {
			                    return d.name + " (" + d.score + ")";
			                  });



						};
					});
				}
			}
		}
	]);


angular.module('googleGauge',[]).directive('gaugeChart',[ function() {
	return {
				restrict: 'EA',
				scope: {
				 	'data':'=',
				 	'qty':'='
				 },
				link:function(scope, element, attrs) {
			// Log element
			var gaugeOptions = {
			    width: 400, height: 120,
			    redFrom: 90, redTo: 100,
			    yellowFrom:75, yellowTo: 90,
			    minorTicks: 5
			  };

			var chart = new google.visualization.Gauge( element[0]);

			scope.$watch('data', function(value) {
				scope.render(value);
			});


			scope.$watch("qty", function(newValue, oldValue) {
				console.log('CTRLFF:', newValue);
				scope.data[1][1] =scope.qty;
				scope.render(scope.data);
			});

			// scope.$watch(scope.plasticRecycledQty, function(value2){
			//  	scope.data[1][1] =scope.plasticRecycledQty;
			//  	scope.render(scope.data);
			//  });

			scope.render=function(data){
				var datas = google.visualization.arrayToDataTable(scope.data);
				chart.draw(datas, gaugeOptions);
			}


		
	}
}
}]);
