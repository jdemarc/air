import tokenService from './tokenService';

export default {
  signup,
  getUser,
  logout,
  login
};

const BASE_URL = '/api/users/';

// user from form -- the state.
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
  // Token is the object returned from the fetch.
  .then(({ token }) => tokenService.setToken(token));
}
  // equivalent to then((token) => token.token)

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

function login(credentials) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(credentials)
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Bad credentials.');
  })
  .then(({ token }) => tokenService.setToken(token));
}