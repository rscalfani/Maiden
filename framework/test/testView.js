define(function(require) {

	var $ = require('jquery');
	var viewModule = require('view');

	var testView = viewModule.newView({
		containerTag: 'div',
		containerId: 'testView',
		cb: {
			create: function(view) {
				view.render();
			},
			render: function(view) {
				view.container.html('<h1><img src= "http://data.whicdn.com/images/63233113/large.png"></h1>')
			},
			destroy: function(view) {
				$('#' + view.containerId).remove();
			}
		}
	});
	return testView;
});