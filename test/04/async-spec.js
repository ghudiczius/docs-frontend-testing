'use strict';

define(function() {
	var MAX_TIMEOUT = 1000;
	var TICK = 500;
	var originalTimeout;
	beforeEach(function() {
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 10001;
	});

	var value;

	describe('A spec with asynchronous calls', function() {
		beforeEach(function() {
			value = 0;
			setTimeout(function() {
				value = 1;
			}, Math.round(Math.random() * MAX_TIMEOUT));
		});

		it('should fail miserably', function() {
			expect(value).toBe(0);
		});
	});

	xdescribe('A spec with asynchronous calls and a mocked timer', function() {
		beforeEach(function() {
			jasmine.clock().install();
			value = 0;
			setTimeout(function() {
				value = 1;
			}, Math.round(Math.random() * MAX_TIMEOUT));
		});

		it('should still fail occasionally', function() {
			jasmine.clock().tick(TICK);
			expect(value).toBe(0);
		});

		afterEach(function() {
			jasmine.clock().uninstall();
		});
	});

	describe('An asynchronous spec', function() {
		beforeEach(function(done) {
			value = 0;
			setTimeout(function() {
				value = 1;
				done();
			}, Math.round(Math.random() * MAX_TIMEOUT));
		});

		it('should wait for the random time generated for "setTimeout"', function () {
			expect(value).toBe(1);
		});
	});

	afterEach(function() {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
	});
});
