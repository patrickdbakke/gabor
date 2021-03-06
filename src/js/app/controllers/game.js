"use strict";
angular.module("gabor")
	.controller("GameController", function($scope, $stateParams, GAMES, $controller){
		var activeGame = _.find(GAMES, {
    		name: $stateParams.gameName
    	});

    	if(activeGame.class){
    		$scope.game = new activeGame.class();
    	} else {
    		$scope.game = $controller(activeGame.controller, $scope.$new());
    	}

		$scope.score = {
			missesThisLevel: 0,
			hitsThisLevel: 0,
			levelScore: 0,

			misses: 0,
			hits: 0,
			totalScore: 0,
			streak: 0,
		};
		
		$scope.difficulty = 1;

		$scope.header.title = $scope.game.title;
	});