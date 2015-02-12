"use strict";
angular.module("gabor")
	.controller("ScoreController", function($scope, close, notificationService){
		$scope.bonuses = [];

		$scope.hitsScore = $scope.score.hitsThisLevel * 100;
		$scope.missesScore = $scope.score.missesThisLevel * 100;
		$scope.difficultyScore = Math.max(1, Math.floor((Math.log($scope.difficulty)) * 100) /100);
		$scope.score.levelScore = $scope.hitsScore - $scope.missesScore;

		$scope.score.levelScore = Math.floor($scope.score.levelScore * $scope.difficultyScore);

		if($scope.hitsThisLevel === $scope.numQuestions && $scope.score.missesThisLevel === 0){
			$scope.bonuses.push({
				name: "Perfect!",
				value:"+ 200"
			});
			$scope.levelScore += 200;
			$scope.score.streak++;
		} else {
			$scope.score.streak = 0;
		}
		if ($scope.score.streak > 2) {
			var streakName;
			var multiplier;
			var streakValue = 0;
			switch(true){
				case $scope.score.streak % 5 === 1 && $scope.score.streak > 1:
				case $scope.score.streak % 5 === 2:
				case $scope.score.streak % 5 === 3:
				case $scope.score.streak % 5 === 4:
					streakName = "On a Roll!";
					multiplier = $scope.score.streak;
					streakValue = 100 * ($scope.score.streak - 1);
					break;
			}
			if(streakName){
				$scope.bonuses.push({
					name: streakName,
					multiplier: multiplier,
					value: "+ " + streakValue
				});
				$scope.levelScore += streakValue;
			}
			if($scope.score.streak > 5){
				$scope.bonuses.push({
					name: "On fire!",
					multiplier: Math.floor($scope.score.streak / 5),
					value: "+ " + 500 * Math.floor($scope.score.streak / 5)
				});
				$scope.levelScore += 500 * Math.floor($scope.score.streak / 5);
			}
		}
		$scope.score.totalScore += $scope.levelScore;

		if ($scope.score.totalScore > $scope.scoresToNextLevel[Math.min($scope.difficulty, $scope.scoresToNextLevel.length)]) {
			notificationService.quick("Level up");
		}

		$scope.continue = function(){
			close(true, 100).then(function(){
				$scope.makeLevel();
			});
		};
	});