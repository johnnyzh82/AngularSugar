(function() {
	'use strict';
	angular.module('appModule').directive('percentAnimate', ['$timeout', function ($timeout) {
		return {
			restrict: 'E',
			replace: true,
			template: '<span>{{curPercent}}<span ng-if="isPercent==1">%</span></span>',
			scope: {
			    number: '=',
			    isPercent: '@',
                speed: '@'
			},
			link: function($scope, element, attrs) {
				$scope.speed = $scope.speed || 30;
				$scope.curPercent = 0;
				var animateTimeout;

				// Loop through and increment percentage to animate in DOM
				function animatePercentChange(fromVal, toVal) {
					if(fromVal != toVal) {
					    $scope.curPercent = (fromVal < toVal) ? (fromVal+1) : toVal;

						animateTimeout = $timeout(function() {
							animatePercentChange($scope.curPercent, toVal);
						}, $scope.speed);
					}
				}

				// if percent changes on scope, update DOM to reflect the change
				$scope.$watch('number', function (newVal, oldVal) {
				    if (!isNaN(newVal) || parseFloat(newVal)) {
				        newVal = newVal || parseFloat(newVal);

				        if ($scope.isPercent == 1) {
				            if (newVal > 100) newVal = 100;
				            if (newVal < 0) newVal = 0;
				        }

						var startVal = (oldVal !== $scope.curPercent) ? $scope.curPercent : oldVal;
						$timeout.cancel(animateTimeout);
						animatePercentChange(startVal, newVal);
					}
				});
			}
		};
	}]);
})();




