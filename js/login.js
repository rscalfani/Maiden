$(function() {
	$('#login').click(function() {
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
	})
});