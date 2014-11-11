'use strict';

/**
 * Simple module.
 */
define(['random'], function(random) {
	var RandomDouble = {};

	/**
	 * Get a random number and doubles it.
	 * @return a double of a random number
	 */
	RandomDouble.getRandomNumberAndDoubleIt = function getRandomNumber() {
		return random.getRandomNumber() * 2;
	};

	return RandomDouble;
});
