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
//		signUp: 'js/signUp',
		validation: 'js/validation',
		view: 'framework/view',
		'node-uuid': 'bower_components/node-uuid/uuid',
		loginView: 'views/login/loginView',
		signUpView: 'views/signUp/signUpView',
		text: 'bower_components/text/text',
		underscore: 'bower_components/underscore-amd/underscore',
		less: 'bower_components/less.js/dist/less-1.4.2'
	}
});
// TODO remove this hack when we are a single page app
require([ 'jquery', 'loginView', 'signUpView', 'less'], function($, loginView, signUpView, less) {
	// put into document
//	loginView.display();
	signUpView.display();
});