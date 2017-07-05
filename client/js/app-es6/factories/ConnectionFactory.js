var ConnectionFactory = (function() {
	var stores = ['negociacoes'];
	var version = 4;
	var dbname = 'aluraframe';
	var connection;
	var close;

	class ConnectionFactory {
		constructor() {
			throw new Error('Não é possível criar instâncias dessa classe.');
		}

		static getConnection() {
			return new Promise((resolve, reject) => {
				let openRequest = window.indexedDB.open(dbname, version);
				openRequest.onupgradeneeded = e => ConnectionFactory._createStores(e.target.result);
				openRequest.onsuccess = e => {
					if (!connection) {
						connection = e.target.result;
						close = connection.close.bind(connection);
						connection.close = function() {
							throw new Error('Are you insane?');
						};
					}
					resolve(connection);
				};
				openRequest.onerror = e => reject(e.target.error);
			});
		}

		static closeConnection() {
			if (connection) {
				close();
				connection = null;
			}
		}

		static _createStores(connection) {
			stores.forEach(store => {
				if (connection.objectStoreNames.contains(store)) {
					connection.deleteObjectStore(store);
				}
				connection.createObjectStore(store, { autoIncrement: true });
			});
		}
	}

	return ConnectionFactory;
})();
