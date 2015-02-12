"use strict";
angular.module("gabor")
	.controller("AboutController", function($scope, $stateParams, GAMES, $sce, $controller){
		var activeGame = _.find(GAMES, {
    		name: $stateParams.gameName
    	});

    	if(activeGame.class){
    		$scope.game = new activeGame.class();
    	} else {
    		$scope.game = $controller(activeGame.controller, $scope.$new());
    	}

    	$scope.about = $sce.trustAsHtml($scope.game.about);
		$scope.header.title = $scope.game.title;
	});