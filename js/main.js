require.config({
	baseUrl: '../js',
	paths: {
		formHelper: 'formHelper',
		jquery: 'jquery.min',
		login: 'login',
		signUp: 'signUp',
		validation: 'validation'
	}
});

require(['login', 'signUp'], function() {

});