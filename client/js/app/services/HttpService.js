class HttpService {
	_handleErrors(response) {
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		return response;
	}

	get(url) {
		return fetch(url)
			.then(response => this._handleErrors(response))
			.then(response => response.json());
	}

	post(url, data) {
		return fetch(url, {
			headers: { 'Content-type': 'application/json' },
			method: 'post',
			body: JSON.stringify(data)
		})
			.then(response => this._handleErrors(response))
			.then(response => response.json());
	}
}
