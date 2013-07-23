define(function(require) {
	var formHelper = require('formHelper').newFormHelper();
	var validation = require('validation');
	var validator = validation.newValidator();
	var $ = require('jquery');

	$(function() {
		var formErrors = {};

		$('#login').click(function() {
			var validationDef = {
				email: {
					regex: validation.regexes.email
				},
				'remember-me': {
					regex: validation.regexes.checkbox
				},
				password: {
					regex: validation.regexes.anything
				}
			}
			$('#errors').empty();
			var errors = validator.validate(formHelper.getFormData($('.form-login')), validationDef);
			if (errors)
			{
				formErrors.validationErr = null;
				formHelper.displayErrors(errors, 'errors');
			}
			else
				delete formErrors.validationErr;
			if (Object.keys(formErrors).length == 0)
				return true;
			else
				return false;
		});
	});
});