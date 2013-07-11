define(function(require) {
	var formHelper = require('formHelper').newFormHelper();
	var validation = require('validation');
	var validator = validation.newValidator();
	var $ = require('jquery');

	$(function() {
		var emailMarginBottom = $('#email').css('margin-bottom');
		var formErrors = {};

		$('#join').click(function() {
//			var fields = ['firstName', 'lastName', 'email', 'password', 'confirmPassword'];
//			if (fields.some(function(id) {
//				return $('#' + id).val() == ''
//			}))
//			{
//				$('#required').show();
//				return false;
//			}
//			else
//				$('#required').hide();

			var validationDef = {
				email: {
					regex: validation.regexes.email
				},
				firstName: {
					regex: validation.regexes.name
				},
				middleName: {
					regex: validation.regexes.name,
					optional: true
				},
				lastName: {
					regex: validation.regexes.lastName
				},
				password: {
					regex: validation.regexes.anything
				},
				confirm: {
					regex: validation.regexes.anything
				}
			};
			$('#errors').empty();
			var errors = validator.validate(formHelper.getFormData($('.form-signup')), validationDef);
			if (errors)
			{
				formErrors.validationErr = null;
//				errors.forEach(function(error) {
//					$('#errors').append('<span class="error">&bull;' + ' ' + error + '<br>' + '</span>');
//				});
				formHelper.displayErrors(errors, 'errors');
			}
			else
				delete formErrors.validationErr;
			if (Object.keys(formErrors).length == 0)
				return true;
			else
				return false;
		});

		$('#email').blur(function() {
			$.post('/emailCheck', {email: $('#email').val()})
			.done(function(res) {
				if (res.success && res.exists)
				{
					formErrors.emailErr = null;
					$('#exists').show();
					$('#email').css('margin-bottom', 0);
				}
				else
				{
					delete formErrors.emailErr;
					$('#exists').hide();
					$('#email').css('margin-bottom', emailMarginBottom);
				}
				if (res.error)
					console.log(res.error);
			})
			.fail(function(jqxhr, textStatus, error ) {
				console.log('ajax failure:', jqxhr, textStatus, error )
			});
		});

		var comparePassword = function() {
			var match = $('#password').val() == $('#confirm').val();

			if ($('#password').val() == '' || $('#confirm').val() == '')
				$('#match').hide();
			else
			{
				if (match)
				{
					$('#match').hide();
					delete formErrors.passwordErr;
				}
				else
				{
					$('#match').show();
					formErrors.passwordErr = null;
				}
			}
			return match;
		};

		$('#password').keyup(function() {
			comparePassword();
		});
		$('#confirm').keyup(function() {
			comparePassword();
		});

		var capitalizeWords = function(s) {
			return s.split(' ').map(function(word) {
				return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
			}).join(' ');
		};

		var fixupField = function(id, invalidChars) {
			var field = $('#' + id);
			var oldValue = field.val();
			var newValue = capitalizeWords(oldValue);
			newValue = newValue.replace(invalidChars, '');
			if (oldValue != newValue)
				field.val(newValue);
		};

		$('#firstName').keyup(function() {
			fixupField('firstName', /[^A-Z]/ig);
		});
		$('#middleName').keyup(function() {
			fixupField('middleName', /[^A-Z]/ig);
		});
		$('#lastName').keyup(function() {
			fixupField('lastName', /[^A-Z' ]/ig);
		});
	});
});