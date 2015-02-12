'use strict';

angular.module('gabor')
    .config(function configureStates($stateProvider, $urlRouterProvider) {
    	$urlRouterProvider.otherwise('/games');

		$stateProvider
            .state('root', {
                abstract:true,
                templateUrl:'views/page.html',
                controller: 'GamesController',
                url: '',
            })
            .state('root.games', {
                url:'/games',
                views: {
                    'header@root': {
                        templateUrl:'views/header.html',
                    },
                    'content@root': {
                        templateUrl:'views/games.html',
                    },
                }
            })
            .state('root.games.game', {
                abstract:true,
                url: '/:gameName',
                resolve: {
                    gameName: ['$stateParams', function($stateParams){
                        return $stateParams.gameName;
                    }]
                }
            })
            .state('root.games.game.about', {
                url: '/about',
                views: {
                    'content@root': {
                        controller: 'AboutController',
                        templateUrl:'views/about.html',
                    },
                }
            })
            .state('root.games.game.play', {
                url: '/play',
                views: {
                    'content@root': {
                        controller: 'GameController',
                        templateUrl:'views/game.html',
                    },
                }
            });
    });