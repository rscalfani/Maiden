define(function(require) {
	var formHelper = {
		newFormHelp: function() {
			var formHelp = {
				getFormData: function(form) {
					var data = {};
					form.find('input').each(function(index, item) {
						var id = $(item).attr('id');
						var val = $('#' + id).val();
						if (val != '')
							data[id] = val;
					});
					return data;
				}
			};
			return formHelp;
		}
	};
	return formHelper;
});