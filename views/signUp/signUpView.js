define(function(require) {
	var $ = require('jquery');
	var formHelper = require('formHelper').newFormHelper();
	var signUpHtml = require('text!views/signUp/signUp.html');
	var validation = require('validation');
	var validator = validation.newValidator();
	var viewModule = require('view');

	var signUpView = viewModule.newView({
		containerTag: 'div',
		containerId: 'signUpView',
		containerClass: 'container',
		cb: {
			create: function(view) {
				view.render(view);
			}
		},
		mixin: {
			center: function() {
				var container = signUpView.container;
				var documentHeight = $(document).height();
				var containerHeight = container.height();
				container.css('margin-top', (documentHeight - containerHeight)/2);
			},
			render: function(view) {
				view = view || signUpView;
				view.container.html(signUpHtml)
			},
			destroy: function() {
				$('#' + signUpView.containerId).remove();
			},
			display: function() {
				$('body').append(signUpView.container);
				signUpView.center();
				$(window).resize(signUpView.center);

				var emailMarginBottom = $('#email').css('margin-bottom');
				var formErrors = {};

				$('#join').click(function() {
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
					var formData = formHelper.getFormData($('.form-signup'));
					var errors = validator.validate(formData, validationDef);
					if (errors)
					{
						formErrors.validationErr = null;
						formHelper.displayErrors(errors, 'errors');
					}
					else
						delete formErrors.validationErr;
					if (Object.keys(formErrors).length == 0)
					{
						formData = formHelper.getFormData($('.form-signup'), true);
						$.post('/signUp', formData)
						.done(function(res) {
							signUpView.destroy();
						})
						.fail(function(jqxhr, textStatus, error) {
							console.error('ajax failure:', jqxhr, textStatus, error);
							alert('Unable to sign up at this time. Please try again later.');
						});
					}
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
						.fail(function(jqxhr, textStatus, error) {
							console.error('ajax failure:', jqxhr, textStatus, error);
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
			}
		}
	});
	return signUpView;
});