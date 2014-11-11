'use strict';

/**
 * Module to test callback visibility.
 **/
define(['angularMocks', 'callback'], function(angularMocks) {
    describe('Directive', function() {
		var $scope, $compile, $element;

		/**
		 * Mock the callback module.
		 */
		beforeEach(function() {
			angularMocks.module('callback');
		});

		/**
		 * Suite for testing callback visibility.
		 */
		describe('without callback in controller scope', function() {
			var element;

			/**
			 * Create an element with callback function.
			 */
			beforeEach(
				angularMocks.inject(function($injector) {
					$scope = $injector.get('$rootScope');
					$compile = $injector.get('$compile');
					$element = angular.element(
						'<div data-ng-app="callback">' +
							'<div data-ng-controller="controller">' +
								'<directive-with-callback-in-controller-scope cb="updateContent()"></directive-with-callback-in-controller-scope>' +
							'</div>' +
						'</div>'
					);
					$compile($element)($scope);
					$scope.$digest();
					element = angular.element($element.children().children()[0]);
				})
			);

			/**
			 * Spec to check if the scope variables and the callback function are defined.
			 */
			it('should have scope and isolated scope values', function() {
				expect(element.scope()).toBeDefined();
				expect(element.scope().updateContent).toBeDefined();
				expect(element.isolateScope()).toBeDefined();
				expect(element.isolateScope().cb).toBeDefined();
			});

			/**
			 * Spec to check if calls are visible.
			 * Checked through a spy on the controller's function.
			 */
			it('should call callback when clicked on', function() {
				spyOn(element.scope(), 'updateContent').and.callThrough();
				element.triggerHandler('click');
				expect(element.scope().updateContent).toHaveBeenCalled();
			});

			/**
			 * Spec to check if call count are visible.
			 * Checked through a spy on the controller's function.
			 */
			it('should call callback each time when clicked on', function() {
				spyOn(element.scope(), 'updateContent').and.callThrough();
				element.triggerHandler('click');
				element.triggerHandler('click');
				element.triggerHandler('click');
				expect(element.scope().updateContent.calls.count()).toBe(3);
			});

			/**
			 * Spec to make sure no calls are fired unless it's necessary.
			 * Checked through a spy on the controller's function.
			 */
			it('should not call callback unless clicked on', function() {
				spyOn(element.scope(), 'updateContent').and.callThrough();
				expect(element.scope().updateContent).not.toHaveBeenCalled();
			});

			/**
			 * Spec to check if calls are visible.
			 * Checked through a spy on the directive's variable.
			 */
			it('should call callback when clicked on', function() {
				spyOn(element.isolateScope(), 'cb').and.callThrough();
				element.triggerHandler('click');
				expect(element.isolateScope().cb).toHaveBeenCalled();
			});

			/**
			 * Spec to check if call count are visible.
			 * Checked through a spy on the directive's variable.
			 */
			it('should call callback each time when clicked on', function() {
				spyOn(element.isolateScope(), 'cb').and.callThrough();
				element.triggerHandler('click');
				element.triggerHandler('click');
				element.triggerHandler('click');
				expect(element.isolateScope().cb.calls.count()).toBe(3);
			});

			/**
			 * Spec to make sure no calls are fired unless it's necessary.
			 * Checked through a spy on the directive's variable.
			 */
			it('should not call callback unless clicked on', function() {
				spyOn(element.isolateScope(), 'cb').and.callThrough();
				expect(element.isolateScope().cb).not.toHaveBeenCalled();
			});
		});
    });
});
