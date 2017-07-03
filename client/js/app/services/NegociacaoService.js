class NegociacaoService {
	constructor() {
		this._baseUrl = 'negociacoes';
		this._http = new HttpService();
	}

	getAllNegociacoes() {
		return Promise.all([
			this.getWeekNegociacoes(),
			this.getLastWeekNegociacoes(),
			this.getLastWeekBeforeNegociacoes(),
		])
		.then(negociacoes => negociacoes.reduce((flatArray, array) => flatArray.concat(array), []))
		.catch(error => new Error(error));
	}

	getWeekNegociacoes() {
		return this._http
			.get(`${this._baseUrl}/semana`)
			.then(array =>
				array.map(item => new Negociacao(new Date(item.data), item.quantidade, item.valor))
			)
			.catch(error => {
				console.log(xhr.responseText);
				throw new Error('Não foi possível obter as negociações da semana.');
			});
	}

	getLastWeekNegociacoes() {
		return this._http
			.get(`${this._baseUrl}/anterior`)
			.then(array =>
				array.map(item => new Negociacao(new Date(item.data), item.quantidade, item.valor))
			)
			.catch(error => {
				console.log(xhr.responseText);
				throw new Error('Não foi possível obter as negociações da semana anterior.');
			});
	}

	getLastWeekBeforeNegociacoes() {
		return this._http
			.get(`${this._baseUrl}/retrasada`)
			.then(array =>
				array.map(item => new Negociacao(new Date(item.data), item.quantidade, item.valor))
			)
			.catch(error => {
				console.log(xhr.responseText);
				throw new Error('Não foi possível obter as negociações da semana.');
			});
	}
}
