'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoDao = function () {
	function NegociacaoDao(connection) {
		_classCallCheck(this, NegociacaoDao);

		this._connection = connection;
		this._store = 'negociacoes';
	}

	_createClass(NegociacaoDao, [{
		key: 'save',
		value: function save(negociacao) {
			var _this = this;

			return new Promise(function (resolve, reject) {
				var request = _this._connection.transaction([_this._store], 'readwrite').objectStore(_this._store).add(negociacao);
				request.onsuccess = function (e) {
					return resolve(negociacao);
				};
				request.onerror = function (e) {
					console.log(e.target.error);
					reject('Não foi possível adicionar a negociação.');
				};
			});
		}
	}, {
		key: 'getAll',
		value: function getAll() {
			var _this2 = this;

			return new Promise(function (resolve, reject) {
				var list = [];
				var cursor = _this2._connection.transaction([_this2._store], 'readwrite').objectStore(_this2._store).openCursor();
				cursor.onsuccess = function (e) {
					var actual = e.target.result;
					if (actual) {
						var data = actual.value;
						list.push(new Negociacao(data._data, data._quantidade, data._valor));
						actual.continue();
					} else {
						resolve(list);
					}
				};
				cursor.onerror = function (e) {
					console.log(e.target.error);
					reject('Não foi possível obter as negociações.');
				};
			});
		}
	}, {
		key: 'deleteAll',
		value: function deleteAll() {
			var _this3 = this;

			return new Promise(function (resolve, reject) {
				var request = _this3._connection.transaction([_this3._store], 'readwrite').objectStore(_this3._store).clear();
				request.onsuccess = function (e) {
					return resolve('Negociações removidas com sucesso.');
				};
				request.onerror = function (e) {
					console.log(e.target.error);
					reject('Não foi possível apagar as negociações.');
				};
			});
		}
	}]);

	return NegociacaoDao;
}();