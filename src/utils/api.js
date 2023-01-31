class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
}

  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
    .then(this._getResponseData)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
    .then(this._getResponseData)
  }

  editProfileInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    })
    .then(this._getResponseData)
  }

  addNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    })
    .then(this._getResponseData)
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(this._getResponseData)
  }

  changeLikeCardStatus(id, like) {
    const selectMethod = like ? "DELETE" : "PUT";
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: selectMethod,
      headers: this._headers,
    })
    .then(this._getResponseData)
  }

  // addLike(id) {
  //   return fetch(`${this._baseUrl}/cards/${id}/likes`, {
  //     method: "PUT",
  //     headers: this._headers,
  //   })
  //   .then(this._getResponseData)
  // }

  // deleteLike(id) {
  //   return fetch(`${this._baseUrl}/cards/${id}/likes`, {
  //     method: "DELETE",
  //     headers: this._headers,
  //   })
  //   .then(this._getResponseData)
  // }

  updateAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    })
    .then(this._getResponseData)
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-54",
  headers: {
    authorization: "0696f677-58b1-4ea2-bdfa-d2fcd17ccfa1",
    "Content-Type": "application/json",
  },
});

export default api;
