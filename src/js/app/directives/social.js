"use strict";

angular.module('gabor')
    .directive('social', function($location, SOCIAL_URLS) {
        return {
            restrict: 'A',
            templateUrl: 'views/social.html',
            controller: function($scope) {
                $scope.twitter = "http://twitter.com/share?text=Loaders&amp;url=" + $location.$$absUrl;
                $scope.facebook = "https://www.facebook.com/sharer/sharer.php?u=" + $location.$$absUrl;
                $scope.gplus = "https://plus.google.com/share?url=" + $location.$$absUrl;
                $scope.github = SOCIAL_URLS.github;
                $scope.linkedin = SOCIAL_URLS.linkedin;
            }
        };
    });