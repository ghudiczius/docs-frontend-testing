'use strict';

/**
 */
define(['angular'], function(angular) {
	angular
	.module('callback', [])

	/**
	 * Controller .
	 */
	.controller('controller', function($scope) {
		$scope.updateContent = function() {
			return null;
		}
	})

	/**
	 * Directive .
	 */
	.directive('directiveWithCallbackInControllerScope', function($browser, $parse, $compile) {
		return {
			restrict : 'E',
			scope : {
				cb: '&'
			},
			template: '<div></div>',
			link : function(scope, element, attrs) {
				element.on('click', function () {
					scope.cb();
				});
			}
		};
	})
});
