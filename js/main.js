require.config({
	shim: {
		'bootstrap': {
			deps: ['jquery']
		},
		'node-uuid': {
			exports: 'uuid'
		}
	},
	baseUrl: '..',
	paths: {
		formHelper: 'js/formHelper',
		jquery: 'bower_components/jquery/jquery',
		login: 'js/login',
		signUp: 'js/signUp',
		validation: 'js/validation',
		view: 'framework/view',
		'node-uuid': 'bower_components/node-uuid/uuid',
		loginView: 'views/login/loginView',
		text: 'js/text',
		underscore: 'bower_components/underscore-amd/underscore',
		less: 'bower_components/less.js/dist/less-1.4.2'
	}
});
// TODO remove this hack when we are a single page app
require([ 'jquery', 'loginView', 'less'], function($, loginView, less) {
	// put into document
	loginView.display();
});