import {baseUrl} from './constants.js';

class Api {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }

    _getResponseData(res) {
      if (res.ok) {
       return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    
    getUser(){
      return fetch(`${this._baseUrl}/users/me`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(this._getResponseData);
    }
  
    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(this._getResponseData);
    }

    patchUserData(newData) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: newData.name,
          about: newData.about
        })
      })
      .then(this._getResponseData);
    }

    postNewCard(data){
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
      .then(this._getResponseData);
    }

    deleteCard(cardId){
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      .then(this._getResponseData);
    }

    changeLikeCardStatus(cardId, putLike){
      return putLike ? this._putLike(cardId) : this._deleteLike(cardId);
    }

    _putLike(cardId){
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      .then(this._getResponseData);
    }

    _deleteLike(cardId){
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      .then(this._getResponseData);
    }

    patchAvatar(data){
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          avatar: data
        })
      })
      .then(this._getResponseData);
    }
    register(email, password){
      return fetch(`${this._baseUrl}/signup`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "password": password,
          "email": email
        })
      })
      .then(this._getResponseData);
    };

    login(email, password){
      return fetch(`${this._baseUrl}/signin`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "password": password,
          "email": email
        })
      })
      .then(this._getResponseData);
    };

    getContent(token) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })
      .then(res => res.json())
      .then(data => data)
    } 
}

const api = new Api(baseUrl);

export default api;