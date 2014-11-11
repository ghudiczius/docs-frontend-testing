'use strict';

define(['random'], function(random) {
	describe('The getRandomNumber function', function () {
		describe('without a spy attached', function () {
			it('should return a random number between 0 and 1', function () {
				expect(random.getRandomNumber()).not.toBeLessThan(0);
				expect(random.getRandomNumber()).toBeLessThan(1);
			});
		});

		describe('with a spy attached', function () {
			beforeEach(function() {
				spyOn(random, 'getRandomNumber').and.returnValue(4);
			});

			it('should return 4 a random number', function () {
				expect(random.getRandomNumber()).toBe(4);
			});
		});

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
