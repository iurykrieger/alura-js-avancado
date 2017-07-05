"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bind = function Bind(model, view) {
	_classCallCheck(this, Bind);

	for (var _len = arguments.length, properties = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
		properties[_key - 2] = arguments[_key];
	}

	var proxy = ProxyFactory.create(model, properties, function (model) {
		return view.update(model);
	});
	view.update(model);

	return proxy;
};
//# sourceMappingURL=Bind.js.map