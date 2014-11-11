'use strict';

define(['xkcdRandom'], function(xkcdRandom) { 
	return {
		getRandomNumberAndDoubleIt: function getRandomNumber() {
			return xkcdRandom.getRandomNumber() * 2;
		}
	}	
});
