'use strict';

/* jasmine specs for controllers go here */
describe('PhoneCat controllers', function() {

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(module('phonecatApp'));
  beforeEach(module('phonecatServices'));

  describe('PhoneListCtrl', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('dechets/dechets2.json').
          respond([{name: 'sac plastocus'}, {name: 'bouteille en verre'}]);

      scope = $rootScope.$new();
      ctrl = $controller('PhoneListCtrl', {$scope: scope});
    }));


    it('should create "phones" model with 2 phones fetched from xhr', function() {
      expect(scope.phones).toEqualData([]);
      $httpBackend.flush();

      expect(scope.phones).toEqualData(
          [{name: 'sac plastocus'}, {name: 'bouteille en verre'}]);
    });


    it('should set the default value of orderProp model', function() {
      expect(scope.orderProp).toBe('age');
    });
  });


  describe('DechetDetailCtrl', function(){
    var scope, $httpBackend, ctrl,
        plasticbagData = function() {
          return {
            name: 'Common plastic bag made from polyethylene',
                images: ['img/objects/plastic-bag.0.jpg', 
                "img/objects/plastic-bag.1.jpg", 
                "img/objects/plastic-bag.2.jpg"]
          }
        };


    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('dechets/plastic-bag.json').respond(plasticbagData());

      $routeParams.dechetId = 'plastic-bag';
      scope = $rootScope.$new();
      ctrl = $controller('DechetDetailCtrl', {$scope: scope});
    }));


    it('should fetch phone detail', function() {
      expect(scope.phone).toEqualData({});
      $httpBackend.flush();

      expect(scope.phone).toEqualData(plasticbagData());
    });
  });
});
