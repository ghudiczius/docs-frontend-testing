'use strict';

/**
 * Modul to demonstrate the testing of asynchronous calls. For the sake of simplicity setTimer was used instead of asynchronous ajax calls or module loading.
 */
define(function() {
	describe('', function() {
		var MAX_TIMEOUT = 1000;
		var TICK = 500;
		var originalTimeout;

		/**
		 * Override jasmine's default timeout interval so it will wait for our specs.
		 */
		beforeEach(function() {
			originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
			jasmine.DEFAULT_TIMEOUT_INTERVAL = 10001;
		});

		var value;

		/**
		 * Test suite for the asynchronous calls with no concern about it being asynchronous.
		 */
		describe('A spec with asynchronous calls', function() {
			/**
			 * Set the value after some time less than one second.
			 */
			beforeEach(function() {
				value = 0;
				setTimeout(function() {
					value = 1;
				}, Math.round(Math.random() * MAX_TIMEOUT));
			});

			/**
			 * Spec for checking the value, which should always fail since it won't wait for the value to be set.
			 */
			it('should fail miserably', function() {
				expect(value).toBe(0);
			});
		});

		/**
		 * Test suite for the asynchronous calls with some concern about it being asynchronous.
		 */
		xdescribe('A spec with asynchronous calls and a mocked timer', function() {
			/**
			 * Set the value after some time less than one second. Use jasmine's clock so the spec can speed up time.
			 */
			beforeEach(function() {
				jasmine.clock().install();
				value = 0;
				setTimeout(function() {
					value = 1;
				}, Math.round(Math.random() * MAX_TIMEOUT));
			});

			/**
			 * Spec for checking the value after speeding up time. Will fail occasionally because the time needed for the value to be set is not known.
			 */
			it('should still fail occasionally', function() {
				jasmine.clock().tick(TICK);
				expect(value).toBe(0);
			});

			/**
			 * Restore the clock.
			 */
			afterEach(function() {
				jasmine.clock().uninstall();
			});
		});

		/**
		 * Test suite for the asynchronous calls with asynchronous support on the testing end.
		 */
		describe('An asynchronous spec', function() {
			/**
			 * Set the value after some time less than one second and wait until "done" is called.
			 */
			beforeEach(function(done) {
				value = 0;
				setTimeout(function() {
					value = 1;
					done();
				}, Math.round(Math.random() * MAX_TIMEOUT));
			});

			/**
			 * The value will be set because the spec didn't start unti the "done" function had been called.
			 */
			it('should wait for the random time generated for "setTimeout"', function () {
				expect(value).toBe(1);
			});
		});

		/**
		 * Restore jasmine's default timeout interval.
		 */
		afterEach(function() {
			jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
		});
	});
});
