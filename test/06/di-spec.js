'use strict';

define(['squireJS'], function(squireJS) {
	describe('The mocked dependency\'s getRandomNumberAndDoubleIt function', function () {
		var squire, di, random;

		beforeEach(function(done) {
			squire = new squireJS('squire-context');
			squire.mock('random', {
				getRandomNumber : function() {
					return 21;
				}
			});
            squire.require(['apps/06/di'], function(_di) {
                di = _di;
                done();
            });
		});

		it('should be defined', function() {
			expect(di).toBeDefined();
			expect(di.getRandomNumberAndDoubleIt).toBeDefined();
		});

		it('should return the answer to the answer to life the universe and everything', function () {
			expect(di.getRandomNumberAndDoubleIt()).toBe(42);
		});

		afterEach(function() {
			squire.remove();
		});
	});

	describe('The stored dependency\'s getRandomNumberAndDoubleIt function', function () {
		var squire, di, random;

		beforeEach(function(done) {
			squire = new squireJS('squire-context');
			squire.store('random');
            squire.require(['apps/06/di', 'mocks'], function(_di, mocks) {
                di = _di;
				random = mocks.store['random'];
                done();
            });
		});

		it('should be defined', function() {
			expect(di).toBeDefined();
			expect(di.getRandomNumberAndDoubleIt).toBeDefined();
		});

		it('should return a random number between 0 and 2', function () {
			expect(di.getRandomNumberAndDoubleIt()).not.toBeLessThan(0);
			expect(di.getRandomNumberAndDoubleIt()).toBeLessThan(2);
		});

		it('should return 8 as the double of a random number', function () {
			spyOn(random, 'getRandomNumber').and.returnValue(4);
			expect(di.getRandomNumberAndDoubleIt()).toBe(8);
		});

		afterEach(function() {
			squire.remove();
		});
	});
});
