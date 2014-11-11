'use strict';

/**
* see https://github.com/angular/angular.js/wiki/Understanding-Scopes
**/
define(['angularMocks', 'scopes'], function(angularMocks) {
    describe('Directive', function() {
		var $scope, $compile, $element;
		var SCOPE_VALUE = "scope value";
		var ISOLATED_SCOPE_VALUE = "isolated value";
		var OVERRIDDEN_SCOPE_VALUE = "overridden value";
		var MODIFIED_SCOPE_VALUE = "modified scope value";
		var MODIFIED_ISOLATED_SCOPE_VALUE = "modified isolated value";

		beforeEach(function() {
			angularMocks.module('scopes');
		});

		describe('without scope', function() {
			var firstElement, secondElement;

			beforeEach(
				angularMocks.inject(function($injector) {
					$scope = $injector.get('$rootScope');
					$compile = $injector.get('$compile');
					$element = angular.element(
						'<div data-ng-app="scopes">' +
							'<div data-ng-controller="controller">' +
								'<directive-without-scope></directive-without-scope>' +
								'<directive-without-scope></directive-without-scope>' +
							'</div>' +
						'</div>'
					);
					$compile($element)($scope);
					$scope.$digest();
					firstElement = angular.element($element.children().children()[0]);
					secondElement = angular.element($element.children().children()[1]);
				})
			);

			it('should have scope values', function() {
				expect(firstElement.isolateScope()).not.toBeDefined();
				expect(firstElement.scope().scopeVariable).toBe(OVERRIDDEN_SCOPE_VALUE);
				expect(firstElement.scope().isolatedScopeVariable).toBe(ISOLATED_SCOPE_VALUE);
				expect(secondElement.isolateScope()).not.toBeDefined();
				expect(secondElement.scope().scopeVariable).toBe(OVERRIDDEN_SCOPE_VALUE);
				expect(secondElement.scope().isolatedScopeVariable).toBe(ISOLATED_SCOPE_VALUE);
			});

			it('should modify scope values for both elements', function() {
				firstElement.scope().scopeVariable = MODIFIED_SCOPE_VALUE;
				expect(secondElement.scope().scopeVariable).toBe(MODIFIED_SCOPE_VALUE);
			});

			it('should modify "isolated" scope values for both elements', function() {
				firstElement.scope().isolatedScopeVariable = MODIFIED_ISOLATED_SCOPE_VALUE;
				expect(secondElement.scope().isolatedScopeVariable).toBe(MODIFIED_ISOLATED_SCOPE_VALUE);
			});
		});

		describe('with scope', function() {
			var firstElement, secondElement;

			beforeEach(
				angularMocks.inject(function($injector) {
					$scope = $injector.get('$rootScope');
					$compile = $injector.get('$compile');
					$element = angular.element(
						'<div data-ng-app="scopes">' +
							'<div data-ng-controller="controller">' +
								'<directive-with-scope></directive-with-scope>' +
								'<directive-with-scope></directive-with-scope>' +
							'</div>' +
						'</div>'
					);
					$compile($element)($scope);
					$scope.$digest();
					firstElement = angular.element($element.children().children()[0]);
					secondElement = angular.element($element.children().children()[1]);
				})
			);

			it('should have scope values', function() {
				expect(firstElement.isolateScope()).not.toBeDefined();
				expect(firstElement.scope().scopeVariable).toBe(OVERRIDDEN_SCOPE_VALUE);
				expect(firstElement.scope().isolatedScopeVariable).toBe(ISOLATED_SCOPE_VALUE);
				expect(secondElement.isolateScope()).not.toBeDefined();
				expect(secondElement.scope().scopeVariable).toBe(OVERRIDDEN_SCOPE_VALUE);
				expect(secondElement.scope().isolatedScopeVariable).toBe(ISOLATED_SCOPE_VALUE);
			});

			it('should modify scope values for only one element', function() {
				firstElement.scope().scopeVariable = MODIFIED_SCOPE_VALUE;
				expect(secondElement.scope().scopeVariable).toBe(OVERRIDDEN_SCOPE_VALUE);
			});

			it('should modify "isolated" scope values for only one element', function() {
				firstElement.scope().isolatedScopeVariable = MODIFIED_ISOLATED_SCOPE_VALUE;
				expect(secondElement.scope().isolatedScopeVariable).toBe(ISOLATED_SCOPE_VALUE);
			});
		});

		describe('with isolated scope', function() {
			var firstElement, secondElement;

			beforeEach(
				angularMocks.inject(function($injector) {
					$scope = $injector.get('$rootScope');
					$compile = $injector.get('$compile');
					$element = angular.element(
						'<div data-ng-app="scopes">' +
							'<div data-ng-controller="controller">' +
								'<directive-with-isolated-scope></directive-with-isolated-scope>' +
								'<directive-with-isolated-scope></directive-with-isolated-scope>' +
							'</div>' +
						'</div>'
					);
					$compile($element)($scope);
					$scope.$digest();
					firstElement = angular.element($element.children().children()[0]);
					secondElement = angular.element($element.children().children()[1]);
				})
			);

			it('should have scope and isolated scope values', function() {
				expect(firstElement.isolateScope()).toBeDefined();
				expect(firstElement.scope().scopeVariable).toBe(SCOPE_VALUE);
				expect(firstElement.scope().isolatedScopeVariable).not.toBeDefined();
				expect(firstElement.isolateScope().scopeVariable).toBe(OVERRIDDEN_SCOPE_VALUE);
				expect(firstElement.isolateScope().isolatedScopeVariable).toBe(ISOLATED_SCOPE_VALUE);
				expect(secondElement.isolateScope()).toBeDefined();
				expect(secondElement.scope().scopeVariable).toBe(SCOPE_VALUE);
				expect(secondElement.scope().isolatedScopeVariable).not.toBeDefined();
				expect(secondElement.isolateScope().scopeVariable).toBe(OVERRIDDEN_SCOPE_VALUE);
				expect(secondElement.isolateScope().isolatedScopeVariable).toBe(ISOLATED_SCOPE_VALUE);
			});

			it('should modify scope values for both elements', function() {
				firstElement.scope().scopeVariable = MODIFIED_SCOPE_VALUE;
				expect(secondElement.scope().scopeVariable).toBe(MODIFIED_SCOPE_VALUE);
				expect(firstElement.isolateScope().scopeVariable).toBe(OVERRIDDEN_SCOPE_VALUE);
				expect(secondElement.isolateScope().scopeVariable).toBe(OVERRIDDEN_SCOPE_VALUE);
			});

			it('should modify overridden scope values for only one element', function() {
				firstElement.isolateScope().scopeVariable = MODIFIED_SCOPE_VALUE;
				expect(secondElement.isolateScope().scopeVariable).toBe(OVERRIDDEN_SCOPE_VALUE);
				expect(firstElement.scope().scopeVariable).toBe(SCOPE_VALUE);
				expect(secondElement.scope().scopeVariable).toBe(SCOPE_VALUE);
			});

			it('should modify isolated scope values for only one element', function() {
				firstElement.isolateScope().isolatedScopeVariable = MODIFIED_ISOLATED_SCOPE_VALUE;
				expect(secondElement.isolateScope().isolatedScopeVariable).toBe(ISOLATED_SCOPE_VALUE);
			});
		});
    });
});
