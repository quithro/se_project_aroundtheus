export default class Api {
    constructor(config) {
        this._baseURL = options.baseURL;
        this._headers = options.headers;
    }

    _getRes(res) {
        return res.ok ? res.json() : Promise.reject(`Error:${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me` , {
            headers: this._headers,
        }).then(this._getRes);
    }

    updateAvatar(url) {
        return fetch(`${this._baseURL}/users/me/avatar`), {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: url.avatar,
            }),
        }.then(this._getRes);
    }

    getInitialCards() {
        return fetch(`${this._baseURL}/cards`, {
            method: "GET",
            headers: this._headers,
        }).then(this._getRes);
    }
    
    profileUpdate(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.description,
            }),
        }).then(this._getRes);
    }

    addCard(card) {
        return fetch(`${this._baseUrl}/cards`, {
          method: "POST",
          headers: this._headers,
          body: JSON.stringify({
            name: card.name,
            link: card.link,
          }),
        }).then(this._getRes);
      }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._getRes);
    }

    likeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this._headers,
        }).then(this._getRes);
    }

    dislikeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._getRes);
    }
}