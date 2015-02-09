'use strict';

angular.module('gabor')
    .config(function configureStates($stateProvider, $urlRouterProvider) {
    	$urlRouterProvider.otherwise('/gabor/');
        $urlRouterProvider.when('/', ['$match', function() {
        	return '/gabor/';
    	}]);
        $urlRouterProvider.when('/gabor', ['$match', function() {
            return '/gabor/';
        }]);

		$stateProvider
            .state('gabor', {
                url: '/gabor',
                templateUrl: 'views/page.html',
                controller: 'GameCtrl',
                resolve: {
                    gabor: [function(){
                        return new Gabor();
                    }]
                }
            })
            .state("gabor.main", {
                url: '/',
                views: {
                    header: {
                        templateUrl:'views/header.html',
                    },
                    content: {
                        templateUrl:'views/content.html',
                        controller: ['$scope', 'gabor', function($scope, gabor){
                            gabor.init("gabor");
                            $scope.makeLevel(1);
                        }],
                    },
                    footer: {
                        templateUrl:'views/footer.html',
                    },
                }
            });
    });