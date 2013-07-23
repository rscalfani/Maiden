define(function(require) {
	var formHelper = {
		newFormHelper: function() {
			var helper = {
				getFormData: function(form) {
					var data = {};
					form.find('input').each(function(index, item) {
						var id = $(item).attr('id');
						if ($(item).attr('type') == 'checkbox')
							data[id] = $(item).is(':checked') ? 'on' : 'off';
						else
						{
						var val = $('#' + id).val();
						if (val != '')
							data[id] = val;
						}
					});
					return data;
				},
				displayErrors: function(errors, divId, errorClass) {
					errorClass = errorClass || 'error';
					errors.forEach(function(error) {
						$('#' + divId).append('<span class="' + errorClass + '">&bull;' + ' ' + error + '<br>' + '</span>');
					});
				}
			};
			return helper;
		}
	};
	return formHelper;
});