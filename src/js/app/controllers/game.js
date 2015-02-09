"use strict";
angular.module("gabor")
	.controller("GameCtrl", function($scope, gabor, $interval, ModalService, $timeout, notificationService){
		var timer;
		$scope.totalScore = 0;
		$scope.misses = 0;
		$scope.missesThisLevel = 0;
		$scope.hits = 0;
		$scope.hitsThisLevel = 0;
		$scope.difficulty = 1;
		$scope.timeSpent = 0;
		$scope.totalTime = 2 * 1000;
		$scope.streak = 0;
		$scope.levelScore = 0;
		$scope.ready = false;
		$scope.loading = true;
		$scope.numQuestions = 10;
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
		function makeLevel(){
			if ($scope.totalScore > $scope.scoresToNextLevel[Math.min($scope.difficulty, $scope.scoresToNextLevel.length)]) {
				$scope.difficulty++;
			}
			$scope.hitsThisLevel = 0;
			$scope.missesThisLevel = 0;
			$scope.levelScore = 0;
			$scope.timeSpent = 0;
			$scope.subtitle = "Level " + $scope.difficulty;
			$scope.scorePerHit = 100;
			$scope.ready = false;
			$scope.loading = true;
			$timeout(function(){
				gabor.startLevel($scope.numQuestions, $scope.difficulty, function(){
					$scope.loading = false;
					$scope.ready = true;
				});
			}, 100);
		}
		function startLevel(){
			if($scope.loading === false){
				$scope.ready = false;
				countDown();
			}
		}
		function countDown(){
			timer = $interval(function() {
				$scope.timeSpent++;
				if ($scope.timeSpent >= $scope.totalTime) {
					endLevel();
				}
			}, 1, $scope.totalTime);
		}
		function endLevel(){
			ModalService.showModal({
				templateUrl:'views/score.html',
				controller: 'ScoreCtrl',
				scope: $scope, 
				inputs: {
					notificationService: notificationService
				}
			});
		}
		gabor.on("levelFinish", function(difficulty){
			endLevel(difficulty);
			$interval.cancel(timer);
		});
		gabor.on("hit", function(){
			$scope.hitsThisLevel++;
			$scope.hits++;
		});
		gabor.on("miss", function(){
			$scope.missesThisLevel++;
			$scope.misses++;
		});
		$scope.startLevel = startLevel;
		$scope.makeLevel = makeLevel;
	});