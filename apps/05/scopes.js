'use strict';

define(['angular'], function(angular) {
	angular
	.module('scopes', [])

	.controller('controller', function($scope) {
		$scope.scopeVariable = "scope value";
	})

	.directive('directiveWithoutScope', function($browser, $parse, $compile) {
		return {
			restrict : 'E',
			controller : function($scope) {
				$scope.scopeVariable = 'overridden value';
				$scope.isolatedScopeVariable = 'isolated value';
			}
		};
	})

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
