export default class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    renderResults(res) {
        if (res.ok) {
            return res.json();
          } else {
          return Promise.reject(`Error: ${res.status}`);
        }
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,  
        }).then(this.renderResult);    
    }            

    updateAvatar(url) {
        return fetch(`${this._baseUrl}/users/me/avatar`), {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: url.avatar,
            }),
        }.then(this.renderResults);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
        }).then(this.renderResults);
    }
    
    profileUpdate({ name, about }) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({ name, about }),
        }).then(this.renderResults);
    }

    addCard(card) {
        return fetch(`${this._baseUrl}/cards`, {
          method: "POST",
          headers: this._headers,
          body: JSON.stringify({
            name: card.name,
            link: card.link,
          }),
        }).then(this.renderResults);
      }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this.renderResults);
    }

    likeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this._headers,
        }).then(this.renderResults);
    }

    dislikeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this.renderResults);
    }
}