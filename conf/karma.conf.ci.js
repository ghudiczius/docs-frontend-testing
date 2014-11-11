'use strict';

var baseConfig = require('./karma.conf.js');

module.exports = function(config) {
	// load base config
	baseConfig(config);

	// override base config
	config.set({
		frameworks : ['jasmine', 'requirejs'],
		preprocessors : {
			'test/**/*-spec.js' : ['coverage']
		},
		coverageReporter : {
			reporters : [{
					type : 'text-summary'
				}, {
					type : 'html',
					dir : 'coverage'
				}, {
					type : 'json',
					dir : 'coverage'
				}
			]
		},
		reporters : ['progress', 'coverage'],
		colors : false,
		autoWatch : false,
		singleRun : true
	});
};
