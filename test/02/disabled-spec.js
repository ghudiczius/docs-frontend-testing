'use strict';

/**
 * Modul to demonstrate how disapling suits and specs can be done.
 */
define(function(xkcdRandom) {
	/**
	 * Disable suite with xdescribe. 
	 */
	xdescribe('This suite is disabled', function() {
		it('should not be executed', function() {
			expect(true).toBe(false);
		});
	});

	describe('Pending specs', function() {
		/**
		 * Disable spec with xit. 
		 */
		xit('can be declared with "xit"', function() {
			expect(true).not.toBe(true);
		});

		/**
		 * Disable spec with "pending" call. 
		 */
		it('can be declared by calling the "pending" function', function() {
			expect(true).not.toBe(true);
			pending();
		});
	});
});
