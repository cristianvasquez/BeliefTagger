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

    })

    .controller('appSearchCtrl', function($scope, $http) {
        this.cards = (function() {
            var tiles = [];
            $http.get("api/nodes").success(
                function (data) {
                    data['@graph'].filter(function (current) {
                        // Here all the stuff to discern what is the image to show etc.
                        tiles.push({
                            id: current["@id"],
                            imageURL: current["foaf:depiction"],
                            title: current["rel:title"],
                        });
                    });
                }
            );
            return tiles;
        })();
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
