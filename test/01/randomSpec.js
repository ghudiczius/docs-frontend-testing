define(['random'], function(random) {
	describe('The getRandomNumber function', function () {
		it('should return a random number', function () {
			expect(random).toBeDefined();
			expect(random.getRandomNumber()).toBe(4);
		});
	});
});
