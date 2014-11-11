'use strict';

var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

var pathToModule = function(path) {
	return path.replace(/^\/base\//, '').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function (file) {
	if (TEST_REGEXP.test(file)) {
		// Normalize paths to RequireJS module names.
		allTestFiles.push(pathToModule(file));
	}
});

require(['/base/apps/require.config.js'], function() {
	// override/extend require.config.js values
	requirejs.config({
		// Karma serves files under /base, which is the basePath from your config file
		baseUrl : '/base',

		// dynamically load all test files
		deps : allTestFiles,

		paths : {
			angular : 'node_modules/angular/angular',
			angularMocks : 'node_modules/angular-mocks/angular-mocks',
			squireJS : 'node_modules/squirejs/src/Squire',
			xkcdRandom : 'apps/01/xkcd-random',
			random : 'apps/03/random',
			scopes : 'apps/05/scopes',
			di : 'apps/06/di'
		},

		shim : {
			angularMocks : {
				deps : ['angular'],
				exports : 'angular.mock'
			}
		},

		// we have to kickoff jasmine, as it is asynchronous
		callback : window.__karma__.start
	})

    // Squire should ignore both of the deps and callback properties
    // see https://github.com/iammerrick/Squire.js/issues/46 and https://github.com/iammerrick/Squire.js/issues/47
	requirejs.config({
		// custom context for squire
		context: 'squire-context',
		baseUrl : '/base',
		paths : {
			angular : 'node_modules/angular/angular',
			angularMocks : 'node_modules/angular-mocks/angular-mocks',
			squireJS : 'node_modules/squirejs/src/Squire',
			xkcdRandom : 'apps/01/xkcd-random',
			random : 'apps/03/random',
			scopes : 'apps/05/scopes',
			di : 'apps/06/di'
		},
		shim : {
			angularMocks : {
				deps : ['angular'],
				exports : 'angular.mock'
			}
		}
	})
});
