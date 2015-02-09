"use strict";
angular.module("gabor")
	.controller("ScoreCtrl", function($scope, close, notificationService){
		$scope.bonuses = [];

		$scope.hitsScore = $scope.hitsThisLevel * 100;
		$scope.missesScore = $scope.missesThisLevel * 100;
		$scope.difficultyScore = Math.max(1, Math.floor((Math.log($scope.difficulty)) * 100) /100);
		$scope.levelScore = $scope.hitsScore - $scope.missesScore;

		$scope.levelScore = Math.floor($scope.levelScore * $scope.difficultyScore);

		if($scope.hitsThisLevel === $scope.numQuestions && $scope.missesThisLevel === 0){
			$scope.bonuses.push({
				name: "Perfect!",
				value:"+ 200"
			});
			$scope.levelScore += 200;
			$scope.streak++;
		} else {
			$scope.streak = 0;
		}
		if ($scope.streak > 2) {
			var streakName;
			var multiplier;
			var streakValue = 0;
			switch(true){
				case $scope.streak % 5 === 1 && $scope.streak > 1:
				case $scope.streak % 5 === 2:
				case $scope.streak % 5 === 3:
				case $scope.streak % 5 === 4:
					streakName = "On a Roll!";
					multiplier = $scope.streak;
					streakValue = 100 * ($scope.streak - 1);
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
			if($scope.streak > 5){
				$scope.bonuses.push({
					name: "On fire!",
					multiplier: Math.floor($scope.streak / 5),
					value: "+ " + 500 * Math.floor($scope.streak / 5)
				});
				$scope.levelScore += 500 * Math.floor($scope.streak / 5);
			}
		}
		$scope.totalScore += $scope.levelScore;

		if ($scope.totalScore > $scope.scoresToNextLevel[Math.min($scope.difficulty, $scope.scoresToNextLevel.length)]) {
			notificationService.quick("Level up");
		}

		$scope.continue = function(){
			close(true, 100).then(function(){
				$scope.makeLevel();
			});
		};
	});