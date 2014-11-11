'use strict';

/**
 * Modul to demonstrate some of the spies' capabilities.
 */
define(['random'], function(random) {
	/**
	 * Test suite for the getRandomNumber function.
	 */
	describe('The getRandomNumber function', function () {
		/**
		 * Spec for testing if the getRandomNumber function works as expected.
		 */
		describe('without a spy attached', function () {
			it('should return a random number between 0 and 1', function () {
				expect(random.getRandomNumber()).not.toBeLessThan(0);
				expect(random.getRandomNumber()).toBeLessThan(1);
			});
		});

		/**
		 * Spec for showing how an attached spy can override the return value.
		 */
		describe('with a spy attached', function () {
			beforeEach(function() {
				spyOn(random, 'getRandomNumber').and.returnValue(4);
			});

			it('should return 4 a random number', function () {
				expect(random.getRandomNumber()).toBe(4);
			});
		});

		/**
		 * Spec for showing how an attached spy can call through and count the number of the calls.
		 */
		describe('with a spy and with callThrough', function () {
			beforeEach(function() {
				spyOn(random, 'getRandomNumber').and.callThrough();
				random.getRandomNumber();
			});

			it('should return 4 a random number', function () {
				expect(random.getRandomNumber).toHaveBeenCalled();
				expect(random.getRandomNumber.calls.count()).toEqual(1);
			});
		});

		/**
		 * Spec for showing how an attached spy can override the called function with a fake one and check if the function wa called with a given parameter.
		 */
		describe('with a spy and with callFake', function () {
			beforeEach(function() {
				spyOn(random, 'getRandomNumber').and.callFake(function(value) {
					return value;
				});
			});

			it('should return 4 a random number', function () {
				expect(random.getRandomNumber(42)).toBe(42);
				expect(random.getRandomNumber).toHaveBeenCalledWith(42);
			});
		});

		/**
		 * Spec for showing how an attached spy force a function to throw an exception and expect an exception to be thrown.
		 */
		describe('with a spy and with throwError', function () {
			beforeEach(function() {
				spyOn(random, 'getRandomNumber').and.throwError('Error');
			});

			it('should throw an error', function () {
				expect(function() {
					random.getRandomNumber()
				}).toThrowError('Error');
			});
		});
	});
});
