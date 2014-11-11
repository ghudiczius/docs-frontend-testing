'use strict';

/**
 * Simple module.
 */
define([], function() {
	var XkcdRandom = {};

	/**
	 * Generate a random number.
	 * Based on xkcd comic #221. see http://xkcd.com/221/
	 * @return a random number
	 */
	XkcdRandom.getRandomNumber = function getRandomNumber() {
		return 4; // chosen by fair dice roll
				  // guaranteed to be random
	};

	return XkcdRandom;
});
