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
		bootstrap: 'js/bootstrap',
		formHelper: 'js/formHelper',
		jquery: 'js/jquery.min',
		login: 'js/login',
		signUp: 'js/signUp',
		validation: 'js/validation',
		view: 'framework/view',
		'node-uuid': 'bower_components/node-uuid/uuid',
		loginView: 'views/login/loginView',
		text: 'js/text',
		underscore: 'js/underscore',
		less: 'js/less'
	}
});
// TODO remove this hack when we are a single page app
require([ 'bootstrap', 'jquery', 'loginView', 'less'], function(bootstrap, $, loginView, less) {
	// put into document
	loginView.display();
});