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
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(msg)
  }).then(res => res.json());
}