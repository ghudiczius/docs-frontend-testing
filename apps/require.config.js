'use strict';

requirejs.config({
	paths : {
		angular : 'node_modules/angular/angular',
		xkcdRandom : 'apps/01/xkcd-random',
		random : 'apps/03/random',
		scopes : 'apps/05/scopes',
		di : 'apps/06/di'
	},
	shim : {
		angular : {
			exports : 'angular'
		}
	}
});
