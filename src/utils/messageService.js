import tokenService from './tokenService';

const BASE_URL = '/api/messages/';

export default {
  index,
  create
};

function index() {
  return fetch(BASE_URL)
  .then(res=>res.json());
}

function create(msg) {
  return fetch(BASE_URL, {
    method: 'POST',
    headers: new Headers({
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + tokenService.getToken()
    }),
    body: JSON.stringify(msg)
  }).then(res => res.json());
}