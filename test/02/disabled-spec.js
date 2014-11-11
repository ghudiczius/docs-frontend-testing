'use strict';

define(function(xkcdRandom) {
	xdescribe('This suite is disabled', function() {
		it('should not be executed', function() {
			expect(true).toBe(false);
		});
	});

	describe('Pending specs', function() {
		xit('can be declared with "xit"', function() {
			expect(true).not.toBe(true);
		});

		it('can be declared by calling the "pending" function', function() {
			expect(true).not.toBe(true);
			pending();
		});
	});
});
