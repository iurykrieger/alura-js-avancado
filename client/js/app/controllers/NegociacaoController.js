class NecociacaoController {
	constructor() {
		let $ = document.querySelector.bind(document);
		this._inputData = $('#data');
		this._inputQuantidade = $('#quantidade');
		this._inputValor = $('#valor');
		this._service = new NegociacaoService();
		this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');
		this._negociacoesList = new Bind(
			new NegociacaoList(),
			new NegociacoesView($('#negociacoesView')),
			'add',
			'clean',
			'orderBy',
			'reverse'
		);
		this._actualColumn = '';
	}

	add(event) {
		event.preventDefault();
		this._negociacoesList.add(this._createNegociacao());
		this._mensagem.texto = 'Negociação adicionada com sucesso!';
		this._cleanForm();
	}

	remove(event) {
		this._negociacoesList.clean();
		this._mensagem.texto = 'Negociações apagadas com sucesso!';
	}

	import(event) {
		this._service
			.getAllNegociacoes()
			.then(negociacoes => {
				negociacoes.forEach(negociacao => this._negociacoesList.add(negociacao));
				this._mensagem.texto = 'Negociações do período importadas com sucesso';
			})
			.catch(error => {
				console.log(error);
				this._mensagem.texto = error;
			});
	}

	orderBy(column) {
		if (column == this._actualColumn) {
			this._negociacoesList.reverse();
		} else {
			this._negociacoesList.orderBy((a, b) => a[column] - b[column]);
		}
		this._actualColumn = column;
	}

	_createNegociacao() {
		return new Negociacao(
			DateHelper.textToDate(this._inputData.value),
			this._inputQuantidade.value,
			this._inputValor.value
		);
	}

	_cleanForm() {
		this._inputData.value = '';
		this._inputQuantidade.value = 1;
		this._inputValor.value = 0.0;
		this._inputData.focus();
	}
}
