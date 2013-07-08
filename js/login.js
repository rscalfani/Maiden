define(function(require) {
	var formHelper = require('formHelper');
	var formHelp = formHelper.newFormHelp();
	var validation = require('validation');
	var validator = validation.newValidator();
	var $ = require('jquery');

	$(function() {
		$('#login').click(function() {
			var validationDef = {
				email: {
					regex: validation.regexes.email
				},
				'remember-me': null,
				password: null
			}
			var errors = validator.validate(formHelp.getFormData($('.form-login')), validationDef);
			if (errors)
			{
				console.log(errors);
//				$('#required').show();
				return false;
			}
			else
				console.log(errors);
//				$('#required').hide();
			return false; // TODO remove this after testing
		});
	});
});