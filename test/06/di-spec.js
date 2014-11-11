'use strict';

/**
 * Modul to demonstrate some of the SquireJS' capabilities.
 */
define(['squireJS'], function(squireJS) {
	/**
	 * Suite for injecting a mocked object with SquireJS.
	 */
	describe('The mocked dependency\'s getRandomNumberAndDoubleIt function', function () {
		var squire, di, random;

		/**
		 * Get a new SquireJS instance and inject a mocked object.
		 * Module loading happens asynchronously.
		 */
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

		/**
		 * Spec to check if the module is defined.
		 */
		it('should be defined', function() {
			expect(di).toBeDefined();
			expect(di.getRandomNumberAndDoubleIt).toBeDefined();
		});

		/**
		 * Spec to see if the module uses the mocked object.
		 */
		it('should return the answer to the answer to life the universe and everything', function () {
			expect(di.getRandomNumberAndDoubleIt()).toBe(42);
		});

		/**
		 * Remove loaded dependencies.
		 */
		afterEach(function() {
			squire.remove();
		});
	});

	/**
	 * Suite for injecting a module with SquireJS and spy on it's functions.
	 */
	describe('The stored dependency\'s getRandomNumberAndDoubleIt function', function () {
		var squire, di, random;

		/**
		 * Get a new SquireJS instance and inject a module.
		 * Store the injected module so the specs can spy on it.
		 * Module loading happens asynchronously.
		 */
		beforeEach(function(done) {
			squire = new squireJS('squire-context');
			squire.store('random');
            squire.require(['apps/06/di', 'mocks'], function(_di, mocks) {
                di = _di;
				random = mocks.store['random'];
                done();
            });
		});

		/**
		 * Spec to check if the module is defined.
		 */
		it('should be defined', function() {
			expect(di).toBeDefined();
			expect(di.getRandomNumberAndDoubleIt).toBeDefined();
		});

		/**
		 * Spec to see if the dependency was injected.
		 */
		it('should return a random number between 0 and 2', function () {
			expect(di.getRandomNumberAndDoubleIt()).not.toBeLessThan(0);
			expect(di.getRandomNumberAndDoubleIt()).toBeLessThan(2);
		});

		/**
		 * Spec to see how to spy on dependencies.
		 */
		it('should return 8 as the double of a random number', function () {
			spyOn(random, 'getRandomNumber').and.returnValue(4);
			expect(di.getRandomNumberAndDoubleIt()).toBe(8);
		});

		/**
		 * Remove loaded dependencies.
		 */
		afterEach(function() {
			squire.remove();
		});
	});
});
