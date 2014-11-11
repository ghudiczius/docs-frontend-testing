'use strict';

requirejs.config({
	paths : {
		angular : "node_modules/angular/angular",
		angularMocks : "node_modules/angular-mocks/angular-mocks",
		xkcdRandom : "apps/01/xkcd-random",
		random : "apps/03/random",
		scopes : "apps/05/scopes",
		di : "apps/06/di"
	},
	shim : {
		angular : {
			exports : "angular"
		},
		angularMocks : {
			deps : ["angular"],
			exports : "angular.mock"
		}
	}
});
