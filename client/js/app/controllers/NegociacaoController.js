'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NecociacaoController = function () {
	function NecociacaoController() {
		_classCallCheck(this, NecociacaoController);

		var $ = document.querySelector.bind(document);
		this._inputData = $('#data');
		this._inputQuantidade = $('#quantidade');
		this._inputValor = $('#valor');
		this._actualColumn = '';
		this._service = new NegociacaoService();
		this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');
		this._negociacoesList = new Bind(new NegociacaoList(), new NegociacoesView($('#negociacoesView')), 'add', 'clean', 'orderBy', 'reverse');
		this._init();
	}

	_createClass(NecociacaoController, [{
		key: '_init',
		value: function _init() {
			var _this = this;

			this.load();
			setInterval(function () {
				_this.import();
			}, 1000);
		}
	}, {
		key: 'load',
		value: function load() {
			var _this2 = this;

			this._service.loadAll().then(function (negociacoes) {
				return negociacoes.forEach(function (negociacao) {
					return _this2._negociacoesList.add(negociacao);
				});
			}).catch(function (error) {
				return _this2._mensagem.texto = error;
			});
		}
	}, {
		key: 'add',
		value: function add(event) {
			var _this3 = this;

			event.preventDefault();
			this._service.save(this._createNegociacao()).then(function (negociacao) {
				_this3._negociacoesList.add(negociacao);
				_this3._mensagem.texto = 'Negociação adicionada com sucesso!';
				_this3._cleanForm();
			}).catch(function (error) {
				return _this3._mensagem.texto = error;
			});
		}
	}, {
		key: 'remove',
		value: function remove(event) {
			var _this4 = this;

			this._service.deleteAll().then(function (message) {
				_this4._negociacoesList.clean();
				_this4._mensagem.texto = message;
			}).catch(function (error) {
				return _this4._mensagem.texto = error;
			});
		}
	}, {
		key: 'import',
		value: function _import() {
			var _this5 = this;

			this._service.import(this._negociacoesList).then(function (negociacoes) {
				negociacoes.forEach(function (negociacao) {
					return _this5._negociacoesList.add(negociacao);
				});
				_this5._mensagem.texto = 'Negociações do período importadas com sucesso';
			}).catch(function (error) {
				return _this5._mensagem.texto = error;
			});
		}
	}, {
		key: 'orderBy',
		value: function orderBy(column) {
			if (column == this._actualColumn) {
				this._negociacoesList.reverse();
			} else {
				this._negociacoesList.orderBy(function (a, b) {
					return a[column] - b[column];
				});
			}
			this._actualColumn = column;
		}
	}, {
		key: '_createNegociacao',
		value: function _createNegociacao() {
			return new Negociacao(DateHelper.textToDate(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
		}
	}, {
		key: '_cleanForm',
		value: function _cleanForm() {
			this._inputData.value = '';
			this._inputQuantidade.value = 1;
			this._inputValor.value = 0.0;
			this._inputData.focus();
		}
	}]);

	return NecociacaoController;
}();