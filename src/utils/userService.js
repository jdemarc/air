import tokenService from './tokenService';

export default {
  signup,
  getUser,
  logout,
  login,
  index
};

const BASE_URL = '/api/users/';

function index() {
  return fetch(BASE_URL)
  .then(res=>res.json());
}

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

export function update(user) {
  return fetch(`${BASE_URL}/${user._id}`, {
    method: 'PUT',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(user)
  }).then(res => res.json());
}