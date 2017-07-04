class NegociacaoDao {
	constructor(connection) {
		this._connection = connection;
		this._store = 'negociacoes';
	}

	save(negociacao) {
		return new Promise((resolve, reject) => {
			let request = this._connection
				.transaction([this._store], 'readwrite')
				.objectStore(this._store)
				.add(negociacao);
			request.onsuccess = e => resolve(negociacao);
			request.onerror = e => {
				console.log(e.target.error);
				reject('Não foi possível adicionar a negociação.');
			};
		});
	}

	getAll() {
		return new Promise((resolve, reject) => {
			let list = [];
			let cursor = this._connection
				.transaction([this._store], 'readwrite')
				.objectStore(this._store)
				.openCursor();
			cursor.onsuccess = e => {
				let actual = e.target.result;
				if (actual) {
					let data = actual.value;
					list.push(new Negociacao(data._data, data._quantidade, data._valor));
					actual.continue();
				} else {
					resolve(list);
				}
			};
			cursor.onerror = e => {
				console.log(e.target.error);
				reject('Não foi possível obter as negociações.');
			};
		});
	}

	deleteAll() {
		return new Promise((resolve, reject) => {
			let request = this._connection
				.transaction([this._store], 'readwrite')
				.objectStore(this._store)
				.clear();
			request.onsuccess = e => resolve('Negociações removidas com sucesso.');
			request.onerror = e => {
				console.log(e.target.error);
				reject('Não foi possível apagar as negociações.');
			};
		});
	}
}
