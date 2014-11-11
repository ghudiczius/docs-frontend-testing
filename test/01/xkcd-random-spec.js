'use strict';

/**
 * Test module for a simple module.
 */
define(['xkcdRandom'], function(xkcdRandom) {
	/**
	 * Test suite for the getRandomNumber function.
	 */
	describe('The getRandomNumber function', function () {
		/**
		 * Spec for testing if the simple modul and the getRandomNumber function are defined.
		 */
		it('should be defined', function () {
			expect(xkcdRandom).toBeDefined();
			expect(xkcdRandom.getRandomNumber).toBeDefined();
		});

		/**
		 * Spec for testing if the getRandomNumber function works as expected.
		 */
		it('should return 4 as a random number', function () {
			expect(xkcdRandom.getRandomNumber()).toBe(4);
		});
	});
});
