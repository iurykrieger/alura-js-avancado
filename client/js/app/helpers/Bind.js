'use strict';

System.register(['../factories/ProxyFactory'], function (_export, _context) {
	"use strict";

	var ProxyFactory, Bind;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [function (_factoriesProxyFactory) {
			ProxyFactory = _factoriesProxyFactory.ProxyFactory;
		}],
		execute: function () {
			_export('Bind', Bind = function Bind(model, view) {
				_classCallCheck(this, Bind);

				for (var _len = arguments.length, properties = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
					properties[_key - 2] = arguments[_key];
				}

				var proxy = ProxyFactory.create(model, properties, function (model) {
					return view.update(model);
				});
				view.update(model);

				return proxy;
			});

			_export('Bind', Bind);
		}
	};
});
//# sourceMappingURL=Bind.js.map