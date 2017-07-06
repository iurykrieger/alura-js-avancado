export class NegociacaoList {
	constructor() {
		this._negociacoes = [];
	}

	add(negociacao) {
		this._negociacoes.push(negociacao);
	}

	get negociacoes() {
		return [].concat(this._negociacoes);
	}

	get volumeTotal() {
		return this._negociacoes.reduce((total, negociacao) => total + negociacao.volume, 0);
	}

	clean() {
		this._negociacoes = [];
	}

	orderBy(criteria) {
		this._negociacoes.sort(criteria);
	}

	reverse() {
		this._negociacoes.reverse();
	}

	exists(negociacao) {
		return this._negociacoes.some(existentNegociacao =>
			existentNegociacao.isEquals(negociacao)
		);
	}
}
