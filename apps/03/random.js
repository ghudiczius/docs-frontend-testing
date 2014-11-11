'use strict';

/**
 * Simple module.
 */
define([], function() {
	var Random = {};

	/**
	 * Generate a random number.
	 * @return a random number
	 */
	Random.getRandomNumber = function getRandomNumber() {
		return Math.random();
	};

	return Random;
});
