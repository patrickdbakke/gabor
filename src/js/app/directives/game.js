"use strict";

angular.module('gabor')
    .directive('game', function($stateParams, GAMES, $controller, $interval, $timeout, notificationService, ModalService) {
        return {
            restrict: 'A',
            controller: function($scope) {
            	var timer;

				$scope.makeLevel = function makeLevel(){
					if ($scope.score.total > $scope.scoresToNextLevel[Math.min($scope.difficulty, $scope.scoresToNextLevel.length)]) {
						$scope.difficulty++;
					}
					$scope.score.hitsThisLevel = 0;
					$scope.score.missesThisLevel = 0;

					$scope.score.levelScore = 0;
					$scope.timer.timeSpent = 0;
					$scope.subtitle = "Level " + $scope.difficulty;
					
					$scope.state.ready = false;
					$scope.state.loading = true;
					
					$timeout(function(){
						$scope.game.startLevel($scope.numQuestions, $scope.difficulty, function(){
							$scope.state.loading = false;
							$scope.state.ready = true;
						});
					}, 100);
				};
				function startLevel(){
					if($scope.state.loading === false){
						$scope.state.ready = false;
						timer = $interval(function() {
							$scope.timer.timeSpent++;
							if ($scope.timer.timeSpent >= $scope.timer.totalTime) {
								endLevel();
							}
						}, 1, $scope.timer.totalTime);
					}
				}
				function endLevel(){
					ModalService.showModal({
						templateUrl:'views/score.html',
						controller: 'ScoreController',
						scope: $scope, 
						inputs: {
							notificationService: notificationService
						}
					});
				}

				$scope.game.$on("levelFinish", function(difficulty){
					endLevel(difficulty);
					$interval.cancel(timer);
				});
				$scope.game.$on("hit", function(){
					$scope.score.hitsThisLevel++;
					$scope.score.hits++;
				});
				$scope.game.$on("miss", function(){
					$scope.score.missesThisLevel++;
					$scope.score.misses++;
				});
		        
				$scope.$on("playButton", startLevel);
            },
            link: function($scope, $element){
            	$element.html($scope.game.template);
            	$scope.game.init("gabor");
		        
				$scope.makeLevel(1);
            }
        };
    });