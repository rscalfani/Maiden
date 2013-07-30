define(function(require) {
	var $ = require('jquery');
	var formHelper = require('formHelper').newFormHelper();
	var loginHtml = require('text!views/login/login.html');
	var validation = require('validation');
	var validator = validation.newValidator();
	var viewModule = require('view');

	var loginView = viewModule.newView({
		containerTag: 'div',
		containerId: 'loginView',
		containerClass: 'container',
		cb: {
			create: function(view) {
				view.render(view);
			}
		},
		mixin: {
			center: function() {
				var container = loginView.container;
				var documentHeight = $(document).height();
				var containerHeight = container.height();
				container.css('margin-top', (documentHeight - containerHeight)/2);
			},
			render: function(view) {
				view = view || loginView;
				view.container.html(loginHtml)
			},
			destroy: function() {
				$('#' + loginView.containerId).remove();
			},
			display: function() {
				$('body').append(loginView.container);
				loginView.center();
				$(window).resize(loginView.center);

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
					var formData = formHelper.getFormData($('.form-login'));
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
						$.post('/login', formData)
						.done(function(res) {
							loginView.destroy();
						})
						.fail(function(jqxhr, textStatus, error) {
							console.error('ajax failure:', jqxhr, textStatus, error);
							alert('Unable to login at this time. Please try again later.');
						});
					}
					return false;
				});
			}
		}
	});
	return loginView;
});