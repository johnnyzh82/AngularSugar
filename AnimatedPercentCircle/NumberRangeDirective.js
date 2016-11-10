(function () {
    'use strict';
    angular.module('appModule').directive('numberRange', ['$timeout', 'AnswerService', function ($timeout, AnswerService) {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                ngModel: "=ngModel",
            },
            link: function (scope, element, attrs, controllers) {
                scope.$watch("ngModel", function (v) {
                    if (v != null) {
                        var value = v;
                        var question = "Q" + attrs.questionNumber;
                        if (!isNaN(parseInt(value))) {
                            if (attrs.max != null && attrs.min != null) {
                                var min = parseInt(attrs.min);
                                var max = parseInt(attrs.max);
                                var curr = parseInt(value);
                                $timeout(function() {
                                    if (curr > max || curr < min) {
                                        element.css("border", "1px solid red");
                                        element.next().css("display", "block");
                                        var key = attrs.value;
                                       
                                        addToInvalidResult(question, attrs.value);
                                        AnswerService.submitAnswer(key, "");
                                    } else {
                                        element.css("border", "1px solid #2795CA");
                                        element.next().css("display", "none");

                                        removeFromInvalidResult(question, attrs.value);
                                    }
                                }, 800);
                            }
                        } else {
                            if (attrs.max != null && attrs.min != null && scope.ngModel != null && scope.ngModel) {
                                $timeout(function() {
                                    element.css("border", "1px solid red");
                                    element.next().css("display", "block");

                                    addToInvalidResult(question, attrs.value);
                                }, 800);
                            }
                        }
                    }
                });

                function addToInvalidResult(question, value) {
                    var added = false;
                    for(var index in AnswerService.invalidNumerRange) {
                        if (AnswerService.invalidNumerRange[index].question === question && AnswerService.invalidNumerRange[index].value === value) {
                            added = true;
                            break;
                        }
                    }
                    if (!added) {
                        AnswerService.invalidNumerRange.push({
                            question: question,
                            value: value
                        });
                    }
                }

                function removeFromInvalidResult(question, value) {
                    for (var index in AnswerService.invalidNumerRange) {
                        if (AnswerService.invalidNumerRange[index].question === question && AnswerService.invalidNumerRange[index].value === value) {
                            AnswerService.invalidNumerRange.splice(index, 1);
                            break;
                        }
                    }
                }
            }
        };
    }]);
})();