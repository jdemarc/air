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
  console.log('hitting get user');
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
  // 1st argument is route -- /api/users/find
  // return to where verify is being called in front end
  return fetch(BASE_URL + 'find', {
    method: 'POST',
    // Understand types of data being sent
    headers: {'content-type': 'application/json'},
    // req.body
    body: JSON.stringify(credentials)
  })
  // Return from user controller, 'find' function
  .then(res => {
    // res is a promise
    // Unwrap promise into json.
    return res.json();
  })
}

function update(user) {
  return fetch(BASE_URL + 'update', {
    method: 'PUT',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(user)
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Update failed.');
  })
  .then(({token}) => tokenService.setToken(token));
}
