(function () {
    'use strict';
    angular.module('appModule').directive('progressAnimate', ['$timeout', function ($timeout) {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="progress">' +
                        '<div class="progress-bar" ng-attr-style="width:{{curPercent}}%;">' +
                        '<span ng-if="curPercent>=90">{{text==null ? curPercent : text}}%</span></div>' +
                        '<span ng-if="curPercent<90">&nbsp;{{text==null ? curPercent : text}}%</span>' +
                        '</div>',
            scope: {
                value: '=',
                speed: '@',
                text: "@"
            },
            link: function ($scope, element, attrs) {
                $scope.speed = $scope.speed || 30;
                $scope.curPercent = 0;
                var animateTimeout;

                // Loop through and increment percentage to animate in DOM
                function animatePercentChange(fromVal, toVal) {
                    if (fromVal != toVal) {
                        $scope.curPercent = (fromVal < toVal) ? (fromVal + 1) : toVal;

                        animateTimeout = $timeout(function () {
                            animatePercentChange($scope.curPercent, toVal);
                        }, $scope.speed);
                    }
                }

                // if percent changes on scope, update DOM to reflect the change
                $scope.$watch('value', function (newVal, oldVal) {
                    if (!isNaN(newVal) || parseFloat(newVal)) {
                        newVal = newVal || parseFloat(newVal);

                        if (newVal > 100) newVal = 100;
                        if (newVal < 0) newVal = 0;

                        var startVal = (oldVal !== $scope.curPercent) ? $scope.curPercent : oldVal;
                        $timeout.cancel(animateTimeout);
                        animatePercentChange(startVal, newVal);
                    }
                });
            }
        };
    }]);
})();




