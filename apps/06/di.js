'use strict';

define(['random'], function(random) {
	return {
		getRandomNumberAndDoubleIt: function getRandomNumber() {
			return random.getRandomNumber() * 2;
		}
	}
});
