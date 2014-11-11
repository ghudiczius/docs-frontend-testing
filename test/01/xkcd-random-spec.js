'use strict';

define(['xkcdRandom'], function(xkcdRandom) {
	describe('The getRandomNumber function', function () {
		it('should return 4 as a random number', function () {
			expect(xkcdRandom).toBeDefined();
			expect(xkcdRandom.getRandomNumber).toBeDefined();
			expect(xkcdRandom.getRandomNumber()).toBe(4);
		});
	});
});
