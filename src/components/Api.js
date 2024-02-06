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
    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        method: "GET",
        headers: this._headers,
      }).then(this.renderResult);
    }
    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        method: "GET",
        headers: this._headers,
      }).then(this.renderResult);
    }
  
    updateAvatar(url) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: url.avatar,
        }),
      }).then(this.renderResult);
    }
  
    profileUpdate(data) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: data.title,
          about: data.description,
        }),
      }).then(this.renderResult);
    }
  
    addCard(card) {
      return fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: card.title,
          link: card.url,
        }),
      }).then(this.renderResult);
    }
  
    deleteCard(card) {
      return fetch(`${this._baseUrl}/cards/${card}`, {
        method: "DELETE",
        headers: this._headers,
      }).then(this.renderResult);
    }
  
    likeCard(card) {
      return fetch(`${this._baseUrl}/cards/${card}/likes`, {
        method: "PUT",
        headers: this._headers,
      }).then(this.renderResult);
    }
  
    dislikeCard(card) {
      return fetch(`${this._baseUrl}/cards/${card}/likes`, {
        method: "DELETE",
        headers: this._headers,
      }).then(this.renderResult);
    }
  }
  