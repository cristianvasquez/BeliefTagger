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

        var testImages = [
            'img/food/bread/pain.JPG',
            'img/food/bread/pain-2.JPG',
            'img/food/bread/pain-3.JPG',
            'img/food/bread/pain-4.JPG',
            'img/food/bread/pain-5.JPG',
            'img/food/bread/pain-6.JPG',
            'img/food/bread/pain-7.JPG',
            'img/food/bread/pain-8.JPG',
            'img/food/bread/pain-9.JPG',
            'img/food/bread/pain-10.JPG',
            'img/food/bread/pain-11.JPG',
            'img/food/bread/pain-12.JPG',
            'img/food/bread/pain-13.JPG',
            'img/food/bread/pain-14.JPG',
            'img/food/bread/pain-15.JPG',
            'img/food/bread/pain-16.JPG',
            'img/food/bread/pain-17.JPG',
            'img/food/bread/pain-18.JPG',
            'img/food/bread/pain-19.JPG',
            'img/food/bread/pain-20.JPG',
            'img/food/bread/pain-21.JPG',
            'img/food/bread/pain-22.JPG',
            'img/food/bread/pain-23.JPG',
            'img/food/bread/pain-24.JPG',
            'img/food/bread/pain-25.JPG',
            'img/food/bread/pain-26.JPG',
            'img/food/icecream/4.JPG',
            'img/food/icecream/8.JPG',
            'img/food/icecream/14.JPG',
            'img/food/icecream/22.JPG',
            'img/food/icecream/cremeux-pecan.JPG',
            'img/food/meat/5.JPG',
            'img/food/meat/6.JPG',
            'img/food/meat/8.JPG',
            'img/food/meat/9.JPG',
            'img/food/meat/15.JPG',
            'img/food/meat/17.JPG',
            'img/food/meat/37.JPG',
            'img/food/meat/45.JPG',
            'img/food/meat/50.JPG',
            'img/food/milk/joost K-16.JPG',
            'img/food/milk/joost K-19.JPG',
            'img/food/milk/joost K-26.JPG',
            'img/food/milk/joost K-28.JPG',
            'img/food/milk/joost K-36.JPG',
            'img/food/milk/joost K-38.JPG',
            'img/food/milk/lait.JPG'
        ];

        $scope.currentImageUrl = testImages[Math.floor(Math.random() * testImages.length)];

    }])
.filter('prettyJSON', function () {
    function prettyPrintJson(json) {
        return JSON ? JSON.stringify(json, null, '  ') : 'cannot pretty print';
    }
    return prettyPrintJson;
})
.run(function($http, $templateCache) {
    var urls = [
        'img/food/bread/pain.JPG',
        'img/food/bread/pain-2.JPG',
        'img/food/bread/pain-3.JPG',
        'img/food/bread/pain-4.JPG',
        'img/food/bread/pain-5.JPG',
        'img/food/bread/pain-6.JPG',
        'img/food/bread/pain-7.JPG',
        'img/food/bread/pain-8.JPG',
        'img/food/bread/pain-9.JPG',
        'img/food/bread/pain-10.JPG',
        'img/food/bread/pain-11.JPG',
        'img/food/bread/pain-12.JPG',
        'img/food/bread/pain-13.JPG',
        'img/food/bread/pain-14.JPG',
        'img/food/bread/pain-15.JPG',
        'img/food/bread/pain-16.JPG',
        'img/food/bread/pain-17.JPG',
        'img/food/bread/pain-18.JPG',
        'img/food/bread/pain-19.JPG',
        'img/food/bread/pain-20.JPG',
        'img/food/bread/pain-21.JPG',
        'img/food/bread/pain-22.JPG',
        'img/food/bread/pain-23.JPG',
        'img/food/bread/pain-24.JPG',
        'img/food/bread/pain-25.JPG',
        'img/food/bread/pain-26.JPG',
        'img/food/icecream/4.JPG',
        'img/food/icecream/8.JPG',
        'img/food/icecream/14.JPG',
        'img/food/icecream/22.JPG',
        'img/food/icecream/cremeux-pecan.JPG',
        'img/food/meat/5.JPG',
        'img/food/meat/6.JPG',
        'img/food/meat/8.JPG',
        'img/food/meat/9.JPG',
        'img/food/meat/15.JPG',
        'img/food/meat/17.JPG',
        'img/food/meat/37.JPG',
        'img/food/meat/45.JPG',
        'img/food/meat/50.JPG',
        'img/food/milk/joost K-16.JPG',
        'img/food/milk/joost K-19.JPG',
        'img/food/milk/joost K-26.JPG',
        'img/food/milk/joost K-28.JPG',
        'img/food/milk/joost K-36.JPG',
        'img/food/milk/joost K-38.JPG',
        'img/food/milk/lait.JPG'
    ];
    angular.forEach(urls, function(url) {
        $http.get(url, {cache: $templateCache});
    });
});