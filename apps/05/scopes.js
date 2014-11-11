'use strict';

/**
 * Module for demonstrating different scopes on angular directives.
 * See https://github.com/angular/angular.js/wiki/Understanding-Scopes for (much) more on this topic.
 */
define(['angular'], function(angular) {
	angular
	.module('scopes', [])

	/**
	 * Controller which adds the scopeVariable to the scope.
	 */
	.controller('controller', function($scope) {
		$scope.scopeVariable = "scope value";
	})

	/**
	 * Directive which adds the isolatedScopeVariable to the scope and overrides the controllers scopeVariable.
	 * This directove does not create a new scope.
	 */
	.directive('directiveWithoutScope', function($browser, $parse, $compile) {
		return {
			restrict : 'E',
			controller : function($scope) {
				$scope.scopeVariable = 'overridden value';
				$scope.isolatedScopeVariable = 'isolated value';
			}
		};
	})

	/**
	 * Directive which adds the isolatedScopeVariable to the scope and overrides the controllers scopeVariable.
	 * This directove creates a new child scope.
	 */
	.directive('directiveWithScope', function($browser, $parse, $compile) {
		return {
			restrict : 'E',
			scope : true,
			controller : function($scope) {
				$scope.scopeVariable = 'overridden value';
				$scope.isolatedScopeVariable = 'isolated value';
			}
		};
	})

	/**
	 * Directive which adds the isolatedScopeVariable to the scope and overrides the controllers scopeVariable.
	 * This directove creates a new isolated scope.
	 */
	.directive('directiveWithIsolatedScope', function($browser, $parse, $compile) {
		return {
			restrict : 'E',
			scope : {
				scopeVariable : '@'
			},
			controller : function($scope) {
				$scope.scopeVariable = 'overridden value';
				$scope.isolatedScopeVariable = 'isolated value';
			}
		};
	});
});
