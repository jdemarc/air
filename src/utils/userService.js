import { token } from 'morgan';
import tokenService from './tokenService';

const BASE_URL = '/api/users/';

function signup(user) {
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(user)
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('E-mail already taken.');
  })
  .then(({ token }) => {
    tokenService.setToken(token);

  });
  // equivalent to then((token) => token.token)
}

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

export default {
  signup,
  getUser,
  logout
};