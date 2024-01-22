export default class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    renderResult(res) {
        if (res.ok) {
            return res.json();
          } else {
          return Promise.reject(`Error: ${res.status}`);
        } 
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: this._headers,  
        }).then((res) => this.renderResult(res));    
    }            

    updateAvatar(url) {
        return fetch(`${this._baseUrl}/users/me/avatar`), {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: url.avatar,
            }),
        }.then((res) => this.renderResult(res));
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: "GET",
            headers: this._headers,
        }).then((res) => this.renderResult(res));
    }
    
    profileUpdate({ name, description }) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: description
            }),
        }).then((res) => this.renderResult(res));
    }

    addCard({ title, url }) {
        return fetch(`${this._baseUrl}/cards`, {
          method: "POST",
          headers: this._headers,
          body: JSON.stringify({
            name: title,
            link: url,
          }),
        }).then((res) => this.renderResult(res));
      }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        }).then((res) => this.renderResult(res));
    }

    likeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this._headers,
        }).then((res) => this.renderResult(res));
    }

    dislikeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this._headers,
        }).then((res) => this.renderResult(res));
    }
}