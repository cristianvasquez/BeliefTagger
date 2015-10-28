'use strict';

angular.module('app', [
                'ngRoute',
                'app.detail',
                'app.master',
                'ngMaterial'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/master'});
}]);
