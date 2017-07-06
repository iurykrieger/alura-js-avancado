export class Negociacao {
	constructor(data, quantidade, valor) {
		this._quantidade = quantidade;
		this._data = new Date(data.getTime());
		this._valor = valor;
		Object.freeze(this);
	}

	get volume() {
		return this._quantidade * this._valor;
	}

	get data() {
		return new Date(this._data.getTime());
	}

	get valor() {
		return this._valor;
	}

	get quantidade() {
		return this._quantidade;
	}

	isEquals(negociacao) {
		return JSON.stringify(this) == JSON.stringify(negociacao);
	}
}
