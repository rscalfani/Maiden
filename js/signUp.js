var emailMarginBottom;

$(function() {
	$('#join').click(function() {
		var fields = ['firstName', 'lastName', 'email', 'password', 'confirmPassword'];
		if (fields.some(function(id) {
			return $('#' + id).val() == ''
		}))
		{
			$('#required').show();
			return false;
		}
		else
			$('#required').hide();
		if ($('#password').val() != $('#confirm').val())
		{
			$('#match').show();
			return false;
		}
		else
			$('#match').hide();
	});

	$('#email').blur(function() {
		$.post('/emailCheck', {email: $('#email').val()})
		.done(function(res) {
			if (res.success)
			{
				if (res.exists)
				{
					$('#exists').show();
					emailMarginBottom = $('#email').css('margin-bottom');
					$('#email').css('margin-bottom', 0);
				}
				else
				{
					$('#exists').hide();
					$('#email').css('margin-bottom', emailMarginBottom);

				}
			}
			else
				console.log(res.error)
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
				$('#match').hide();
			else
				$('#match').show();
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