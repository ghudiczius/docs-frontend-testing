'use strict';

/**
 * Test module for demonstrating different scopes on angular directives.
 * See https://github.com/angular/angular.js/wiki/Understanding-Scopes for (much) more on this topic.
 **/
define(['angularMocks', 'scopes'], function(angularMocks) {
    describe('Directive', function() {
		var $scope, $compile, $element;
		var SCOPE_VALUE = "scope value";
		var ISOLATED_SCOPE_VALUE = "isolated value";
		var OVERRIDDEN_SCOPE_VALUE = "overridden value";
		var MODIFIED_SCOPE_VALUE = "modified scope value";
		var MODIFIED_ISOLATED_SCOPE_VALUE = "modified isolated value";

		/**
		 * Mock the scopes module.
		 */
		beforeEach(function() {
			angularMocks.module('scopes');
		});

		/**
		 * Suite for directive with no own scope.
		 */
		describe('without scope', function() {
			var firstElement, secondElement;

			/**
			 * Create two custom elements with the directive.
			 */
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

			/**
			 * Spec to check if the scope variables are defined.
			 * The directive overrides the scopeVariable and does not have isolated scope.
			 */
			it('should have scope values', function() {
				expect(firstElement.isolateScope()).not.toBeDefined();
				expect(firstElement.scope().scopeVariable).toBe(OVERRIDDEN_SCOPE_VALUE);
				expect(firstElement.scope().isolatedScopeVariable).toBe(ISOLATED_SCOPE_VALUE);
				expect(secondElement.isolateScope()).not.toBeDefined();
				expect(secondElement.scope().scopeVariable).toBe(OVERRIDDEN_SCOPE_VALUE);
				expect(secondElement.scope().isolatedScopeVariable).toBe(ISOLATED_SCOPE_VALUE);
			});

			/**
			 * Spec to see that the scope of the two directives are indeed the same.
			 */
			it('should modify scope values for both elements', function() {
				expect(firstElement.scope().$id).toEqual(secondElement.scope().$id);
			});

			/**
			 * Spec to see that modifying a scope variable on one element will change it for the other.
			 * This is for variables inherited from the parent scope.
			 */
			it('should modify scope values for both elements', function() {
				firstElement.scope().scopeVariable = MODIFIED_SCOPE_VALUE;
				expect(secondElement.scope().scopeVariable).toBe(MODIFIED_SCOPE_VALUE);
			});

			/**
			 * Spec to see that modifying a scope variable on one element will change it for the other.
			 * This is for variables created within the directive and added to the parent scope.
			 */
			it('should modify "isolated" scope values for both elements', function() {
				firstElement.scope().isolatedScopeVariable = MODIFIED_ISOLATED_SCOPE_VALUE;
				expect(secondElement.scope().isolatedScopeVariable).toBe(MODIFIED_ISOLATED_SCOPE_VALUE);
			});
		});

		/**
		 * Suite for directive with own child scope.
		 */
		describe('with scope', function() {
			var firstElement, secondElement;

			/**
			 * Create two custom elements with the directive.
			 */
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

			/**
			 * Spec to check if the scope variables are defined.
			 * The directive overrides the scopeVariable and does not have isolated scope.
			 */
			it('should have scope values', function() {
				expect(firstElement.isolateScope()).not.toBeDefined();
				expect(firstElement.scope().scopeVariable).toBe(OVERRIDDEN_SCOPE_VALUE);
				expect(firstElement.scope().isolatedScopeVariable).toBe(ISOLATED_SCOPE_VALUE);
				expect(secondElement.isolateScope()).not.toBeDefined();
				expect(secondElement.scope().scopeVariable).toBe(OVERRIDDEN_SCOPE_VALUE);
				expect(secondElement.scope().isolatedScopeVariable).toBe(ISOLATED_SCOPE_VALUE);
			});

			/**
			 * Spec to see that the scope of the two directives are indeed the same.
			 */
			it('should modify scope values for both elements', function() {
				expect(firstElement.scope().$id).not.toEqual(secondElement.scope().$id);
			});

			/**
			 * Spec to see that modifying a scope variable on one element will not change it for the other.
			 * This is for variables created within the directive and belong to the child scope.
			 */
			it('should modify scope values for only one element', function() {
				firstElement.scope().scopeVariable = MODIFIED_SCOPE_VALUE;
				expect(secondElement.scope().scopeVariable).toBe(OVERRIDDEN_SCOPE_VALUE);
			});

			/**
			 * Spec to see that modifying a scope variable on one element will not change it for the other.
			 * This is for variables created within the directive and belong to the child scope.
			 */
			it('should modify "isolated" scope values for only one element', function() {
				firstElement.scope().isolatedScopeVariable = MODIFIED_ISOLATED_SCOPE_VALUE;
				expect(secondElement.scope().isolatedScopeVariable).toBe(ISOLATED_SCOPE_VALUE);
			});
		});

		/**
		 * Suite for directive with own isolated scope.
		 */
		describe('with isolated scope', function() {
			var firstElement, secondElement;

			/**
			 * Create two custom elements with the directive.
			 */
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

			/**
			 * Spec to check if the scope variables are defined.
			 * Variables defined in the parent scope can be reached through the elements scope.
			 * Variables defined within the directive can be reached through the elements isolated scope.
			 */
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

			/**
			 * Spec to see that the scope of the two directives are indeed the same.
			 * Neither are the isolated scopes.
			 */
			it('should modify scope values for both elements', function() {
				expect(firstElement.scope().$id).toEqual(secondElement.scope().$id);
				expect(firstElement.isolateScope().$id).not.toEqual(firstElement.scope().$id);
				expect(secondElement.isolateScope().$id).not.toEqual(secondElement.scope().$id);
				expect(firstElement.isolateScope().$id).not.toEqual(secondElement.isolateScope().$id);
			});

			/**
			 * Spec to see that modifying a scope variable on one element will change it for the other.
			 * This is for variables inherited from the parent scope.
			 */
			it('should modify scope values for both elements', function() {
				firstElement.scope().scopeVariable = MODIFIED_SCOPE_VALUE;
				expect(secondElement.scope().scopeVariable).toBe(MODIFIED_SCOPE_VALUE);
				expect(firstElement.isolateScope().scopeVariable).toBe(OVERRIDDEN_SCOPE_VALUE);
				expect(secondElement.isolateScope().scopeVariable).toBe(OVERRIDDEN_SCOPE_VALUE);
			});

			/**
			 * Spec to see that modifying an scope variable on one element will not change it for the other.
			 * This is for variables created within the directive since those belong in the isolated sacope.
			 */
			it('should modify overridden (isolated) scope values for only one element', function() {
				firstElement.isolateScope().scopeVariable = MODIFIED_SCOPE_VALUE;
				expect(secondElement.isolateScope().scopeVariable).toBe(OVERRIDDEN_SCOPE_VALUE);
				expect(firstElement.scope().scopeVariable).toBe(SCOPE_VALUE);
				expect(secondElement.scope().scopeVariable).toBe(SCOPE_VALUE);
			});

			/**
			 * Spec to see that modifying an isolated scope variable on one element will not change it for the other.
			 */
			it('should modify isolated scope values for only one element', function() {
				firstElement.isolateScope().isolatedScopeVariable = MODIFIED_ISOLATED_SCOPE_VALUE;
				expect(secondElement.isolateScope().isolatedScopeVariable).toBe(ISOLATED_SCOPE_VALUE);
			});
		});
    });
});
