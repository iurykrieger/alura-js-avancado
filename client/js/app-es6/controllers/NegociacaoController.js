import { NegociacaoList } from '../models/NegociacaoList';
import { Negociacao } from '../models/Negociacao';
import { Mensagem } from '../models/Mensagem';
import { NegociacoesView } from '../views/NegociacoesView';
import { MensagemView } from '../views/MensagemView';
import { NegociacaoService } from '../services/NegociacaoService';
import { DateHelper } from '../helpers/DateHelper';
import { Bind } from '../helpers/Bind';

class NecociacaoController {
	constructor() {
		let $ = document.querySelector.bind(document);
		this._inputData = $('#data');
		this._inputQuantidade = $('#quantidade');
		this._inputValor = $('#valor');
		this._actualColumn = '';
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
		this._init();
	}

	_init() {
		this.load();
		setInterval(() => {
			this.import();
		}, 1000);
	}

	load() {
		this._service
			.loadAll()
			.then(negociacoes =>
				negociacoes.forEach(negociacao => this._negociacoesList.add(negociacao))
			)
			.catch(error => (this._mensagem.texto = error));
	}

	add(event) {
		event.preventDefault();
		this._service
			.save(this._createNegociacao())
			.then(negociacao => {
				this._negociacoesList.add(negociacao);
				this._mensagem.texto = 'Negociação adicionada com sucesso!';
				this._cleanForm();
			})
			.catch(error => (this._mensagem.texto = error));
	}

	remove(event) {
		this._service
			.deleteAll()
			.then(message => {
				this._negociacoesList.clean();
				this._mensagem.texto = message;
			})
			.catch(error => (this._mensagem.texto = error));
	}

	import() {
		this._service
			.import(this._negociacoesList)
			.then(negociacoes => {
				negociacoes.forEach(negociacao => this._negociacoesList.add(negociacao));
				this._mensagem.texto = 'Negociações do período importadas com sucesso';
			})
			.catch(error => (this._mensagem.texto = error));
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
			parseInt(this._inputQuantidade.value),
			parseFloat(this._inputValor.value)
		);
	}

	_cleanForm() {
		this._inputData.value = '';
		this._inputQuantidade.value = 1;
		this._inputValor.value = 0.0;
		this._inputData.focus();
	}
}
