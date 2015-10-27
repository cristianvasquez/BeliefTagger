'use strict';

angular.module('app.detail', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/detail/:detailId', {
        templateUrl: './detail/detail.html',
        controller: 'DetailCtrl'
  });
}])

.controller('DetailCtrl', ["$scope", "$routeParams","$http",function($scope, $routeParams, $http) {
        $http.get("api/nodes/"+$routeParams.detailId).success(function (marker) {
            $scope.current=marker;
        });
    }])
.filter('prettyJSON', function () {
    function prettyPrintJson(json) {
        return JSON ? JSON.stringify(json, null, '  ') : 'cannot pretty print';
    }
    return prettyPrintJson;
})
;