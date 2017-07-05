class NegociacaoService {
	constructor() {
		this._baseUrl = 'negociacoes';
		this._http = new HttpService();
	}

	getAllNegociacoes() {
		return Promise.all([
			this.getWeekNegociacoes(),
			this.getLastWeekNegociacoes(),
			this.getLastWeekBeforeNegociacoes()
		])
			.then(negociacoes =>
				negociacoes.reduce((flatArray, array) => flatArray.concat(array), [])
			)
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

	save(negociacao) {
		return ConnectionFactory.getConnection()
			.then(connection => new NegociacaoDao(connection))
			.then(dao => dao.save(negociacao))
			.catch(error => new Error(error));
	}

	deleteAll() {
		return ConnectionFactory.getConnection()
			.then(connection => new NegociacaoDao(connection))
			.then(dao => dao.deleteAll())
			.catch(error => new Error(error));
	}

	loadAll() {
		return ConnectionFactory.getConnection()
			.then(connection => new NegociacaoDao(connection))
			.then(dao => dao.getAll())
			.catch(error => new Error(error));
	}

	import(list) {
		return this.getAllNegociacoes()
			.then(negociacoes => negociacoes.filter(newNegociacao => !list.exists(newNegociacao)))
			.catch(error => new Error(error));
	}
}
