class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getInitialCards() {
    const token = localStorage.getItem("jwt");
    return this._request(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  setInitialCards(data) {
    const token = localStorage.getItem("jwt");
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
  }

  getUserInfo() {
    const token = localStorage.getItem("jwt");
    return this._request(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  setUserInfo(data) {
    const token = localStorage.getItem("jwt");
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  setUserAvatar(data) {
    const token = localStorage.getItem("jwt");
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }

  changeLikeCardStatus(cardId, like) {
    const token = localStorage.getItem("jwt");
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: like ? "PUT" : "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  removeCard(cardId) {
    const token = localStorage.getItem("jwt");
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }
}

const api = new Api({
  baseUrl: "https://api.mesto-c-ya-l8er.nomoredomainsrocks.ru",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
