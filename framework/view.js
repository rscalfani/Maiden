define(function(require) {
	var $ = require('jquery');
	var _ = require('underscore');
	var uuid = require('node-uuid');

	var modulePrivate = {
		getValues: function(viewDef) {
			Object.keys(viewDef).forEach(function(key) {
				viewDef[key] = _.result(viewDef, key)
			})
		}
	};

	var viewModule = {
		newView: function (viewDef) {
			// fixup viewDef
			viewDef = _.defaults(_.clone(viewDef), {
				containerTag: 'div',
				containerId: uuid.v4(),
				containerAttrs: {},
				cb: {},
				mixin: {}
			});

			_.defaults(viewDef.cb, {
				create: function() {}
			});

			_.defaults(viewDef.mixin, {
				render: function() {},
				destroy: function() {},
				display: function() {}
			});
			modulePrivate.getValues(viewDef);
			// build attributes for container
			var attributes = _.clone(viewDef.containerAttrs);
			attributes.class = viewDef.containerClass;
			attributes.id = viewDef.containerId;
			// private state
			var private = {
				container: $('<' + viewDef.containerTag + '/>').attr(attributes)
			};
			// the generic view
			var view = {
				get container() {
					return private.container;
				},
				containerId: viewDef.containerId
			};

			_.defaults(view, viewDef.mixin);
			viewDef.cb.create(view);
			return view;
		}
	};
	return viewModule;
});