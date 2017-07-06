"use strict";

System.register([], function (_export, _context) {
	"use strict";

	var _createClass, NegociacaoList;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [],
		execute: function () {
			_createClass = function () {
				function defineProperties(target, props) {
					for (var i = 0; i < props.length; i++) {
						var descriptor = props[i];
						descriptor.enumerable = descriptor.enumerable || false;
						descriptor.configurable = true;
						if ("value" in descriptor) descriptor.writable = true;
						Object.defineProperty(target, descriptor.key, descriptor);
					}
				}

				return function (Constructor, protoProps, staticProps) {
					if (protoProps) defineProperties(Constructor.prototype, protoProps);
					if (staticProps) defineProperties(Constructor, staticProps);
					return Constructor;
				};
			}();

			_export("NegociacaoList", NegociacaoList = function () {
				function NegociacaoList() {
					_classCallCheck(this, NegociacaoList);

					this._negociacoes = [];
				}

				_createClass(NegociacaoList, [{
					key: "add",
					value: function add(negociacao) {
						this._negociacoes.push(negociacao);
					}
				}, {
					key: "clean",
					value: function clean() {
						this._negociacoes = [];
					}
				}, {
					key: "orderBy",
					value: function orderBy(criteria) {
						this._negociacoes.sort(criteria);
					}
				}, {
					key: "reverse",
					value: function reverse() {
						this._negociacoes.reverse();
					}
				}, {
					key: "exists",
					value: function exists(negociacao) {
						return this._negociacoes.some(function (existentNegociacao) {
							return existentNegociacao.isEquals(negociacao);
						});
					}
				}, {
					key: "negociacoes",
					get: function get() {
						return [].concat(this._negociacoes);
					}
				}, {
					key: "volumeTotal",
					get: function get() {
						return this._negociacoes.reduce(function (total, negociacao) {
							return total + negociacao.volume;
						}, 0);
					}
				}]);

				return NegociacaoList;
			}());

			_export("NegociacaoList", NegociacaoList);
		}
	};
});
//# sourceMappingURL=NegociacaoList.js.map