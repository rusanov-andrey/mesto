export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._profileId = '';
  }

  getProfile() {
    return this._get('/users/me');
  }
  updateProfileData(data) {
    return this._patch('/users/me', data)
  }
  updateProfileAvatar() {}
  setProfileId(id) {
    this._profileId = id;
  }
  get profileId() {
    return this._profileId;
  }

  getCards() {
    return this._get('/cards');
  }
  addCard(data) {
    return this._post('/cards', data)
  }
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => {
      if(res.ok) {
        return true;
      }
  
      return Promise.reject(`Ошибка ${res.status}`);
      });
  }

  likeCard(id) {
    return this._put(`/cards/${id}/likes`)
  }
  unlikeCard(id) {
    return this._delete(`/cards/${id}/likes`)
  }

  _get(url) {
    return fetch(`${this._baseUrl}${url}`, {
      headers: this._headers
    })
    .then((res) => {
      return this._handleRes(res);
    })
  }

  _post(url, data) {
    return this._send(url, 'POST', data);
  }
  _put(url, data) {
    return this._send(url, 'PUT', data);
  }
  _patch(url, data) {
    return this._send(url, 'PATCH', data);
  }

  _send(url, method, data) {
    return fetch(`${this._baseUrl}${url}`, {
      method: method,
      headers: this._headers,
      body: JSON.stringify(data || {}),
    })
    .then(res => {
      return this._handleRes(res);
    });
  }

  _delete(url, data) {
    return this._send(url, 'DELETE', data);
  }

  _handleRes(res) {
    if(res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка ${res.status}`);
  }

  _handleDel(res) {
    if(res.ok) {
      return true;
    }

    return Promise.reject(`Ошибка ${res.status}`);
  }
}