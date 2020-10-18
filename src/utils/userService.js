import tokenService from './tokenService';

export default {
  signup,
  getUser,
  logout,
  login,
  index,
  verify,
  update,
};

const BASE_URL = '/api/users/';

function index() {
  return fetch(BASE_URL)
  .then(res=>res.json());
}

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
  .then(({ token }) => tokenService.setToken(token));
}

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

// Verify password
function verify(credentials) {
  return fetch(BASE_URL + 'find', {
    method: 'POST',
    // Understand types of data being sent
    headers: new Headers({
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + tokenService.getToken()
    }),
    // req.body
    body: JSON.stringify(credentials)
  })
  .then(res => {
    return res.json();
  })
}

function update(user) {
  return fetch(BASE_URL + 'update', {
    method: 'PUT',
    headers: new Headers({
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + tokenService.getToken()
    }),
    body: JSON.stringify(user)
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Update failed.');
  })
  .then(({token}) => tokenService.setToken(token));
}
