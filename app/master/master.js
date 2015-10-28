'use strict';

angular.module('app.master', ['ngMaterial','ngRoute'])
    .config(function($mdIconProvider,$routeProvider) {

        $routeProvider.when('/master', {
            templateUrl: './master/master.html',
            controller: 'MasterCtrl'
        });

        $mdIconProvider
            .icon('share-arrow', 'img/icons/share-arrow.svg', 24)
            .icon('upload', 'img/icons/upload.svg', 24)
            .icon('copy', 'img/icons/copy.svg', 24)
            .icon('hangout', 'img/icons/hangout.svg', 24)
            .icon('mail', 'img/icons/mail.svg', 24)
            .icon('message', 'img/icons/message.svg', 24)
            .icon('copy2', 'img/icons/copy2.svg', 24)
            .icon('facebook', 'img/icons/facebook.svg', 24)
            .icon('twitter', 'img/icons/twitter.svg', 24);

        $mdIconProvider.iconSet("avatar", 'icons/avatar-icons.svg', 128);
    })
    .controller('BottomSheetExample', function($scope, $timeout, $mdBottomSheet, $mdToast) {
        $scope.alert = '';
        $scope.showListBottomSheet = function($event) {
            $scope.alert = '';
            $mdBottomSheet.show({
                templateUrl: 'master/share-template.html',
                controller: 'ListBottomSheetCtrl',
                targetEvent: $event
            }).then(function(clickedItem) {
                $scope.alert = clickedItem['name'] + ' clicked!';

                $mdToast.show(
                    $mdToast.simple()
                        .content(clickedItem['name'] + ' clicked!')
                        .position('top right')
                        .hideDelay(1500)
                );
            });
        };
    })
    .controller('ListBottomSheetCtrl', function($scope, $mdBottomSheet) {
        $scope.items = [
            { name: 'Share', icon: 'share-arrow' },
            { name: 'Upload', icon: 'upload' },
            { name: 'Copy', icon: 'copy' },

            { name: 'Hangout', icon: 'hangout' },
            { name: 'Mail', icon: 'mail' },
            { name: 'Message', icon: 'message' },
            { name: 'Copy', icon: 'copy2' },
            { name: 'Facebook', icon: 'facebook' },
            { name: 'Twitter', icon: 'twitter' },
        ];
        $scope.listItemClick = function($index) {
            var clickedItem = $scope.items[$index];
            $mdBottomSheet.hide(clickedItem);
        };
    })
    .controller('MasterCtrl', function ($scope, $http) {

        $http.get("api/nodes").success(
            function (data) {
                console.log(data);
            }
        );
    })

    .controller('mainListCtrl', function($scope) {

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

        this.cards = (function() {
            var tiles = [];
            for (var i = 0; i < 46; i++) {
                tiles.push({
                    imageURL: randomImage(),
                    colspan: randomSpan(),
                    rowspan: randomSpan()
                });
            }
            return tiles;
        })();
        function randomImage() {
            return testImages[Math.floor(Math.random() * testImages.length)];
        }
        function randomSpan() {
            var r = Math.random();
            if (r < 0.8) {
                return 1;
            } else if (r < 0.9) {
                return 2;
            } else {
                return 3;
            }
        }
    })

    .run(function($http, $templateCache) {
        var urls = [
            'img/icons/share-arrow.svg',
            'img/icons/upload.svg',
            'img/icons/copy.svg',
            'img/icons/hangout.svg',
            'img/icons/mail.svg',
            'img/icons/message.svg',
            'img/icons/copy2.svg',
            'img/icons/facebook.svg',
            'img/icons/twitter.svg'
        ];
        angular.forEach(urls, function(url) {
            $http.get(url, {cache: $templateCache});
        });
    });
