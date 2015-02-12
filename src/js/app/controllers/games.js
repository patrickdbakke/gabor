"use strict";
angular.module("gabor")
	.controller("GamesController", function($scope, GAMES){
		$scope.header = {
			title: "Brain Games",
			subtitle: ""
		};
		$scope.scoresToNextLevel = [
			0, 
			700,
			2000, 
			5000,
			10000,
			20000, 
			32000,
			50000,
			100000
		];
		$scope.numQuestions = 10;

		$scope.state = {
			loading: false,
			ready: false
		};

		$scope.timer = {
    		timeSpent: 0,
    		totalTime: 2 * 1000,
    	};

		$scope.playButton = function(){
			$scope.$broadcast("playButton");
		};
		
		$scope.games = _.map(GAMES, function(game){
			return {
				name: game.name,
				title: game.class.prototype.title,
				logo: game.class.prototype.logo,
				summary: game.class.prototype.summary,
				color: "background-color:" + game.class.prototype.color + ";",
			};
		});
	});