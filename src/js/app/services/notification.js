"use strict";

angular.module("gabor")
	.factory("notificationService", function(ModalService, $timeout){
		function notification(message){
			ModalService.showModal({
				templateUrl: 'views/notification.html',
				controller: 'NotificationController',
				input: {
					$timeout: $timeout
				}
			}).then(function(modal){
				modal.scope.message = message;
				angular.element(modal.element).fadeOut(0).fadeIn(1000);
				$timeout(function(){
					angular.element(modal.element).fadeOut(1000);
				}, 2000);
			});
		}
		return {
			quick: notification
		};
	});
angular.module('gabor')
	.controller('NotificationController', function($scope, close, $timeout){
		$timeout(function(){
			close(true);
		}, 3000);
	});