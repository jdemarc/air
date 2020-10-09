export default {
  setToken,
  getToken,
  getUserFromToken,
  removeToken
};

function setToken(token) {
  if (token) {
    // Local storage is a built-in web API in every browser.
    // Used for persisting data in a browser.
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
}

function getToken() {
  let token = localStorage.getItem('token');

  if (token) {
    // Split the token at the '.'. This returns an array of 3.
    // The payload is located at [1] in the array.
    // Call atob method on payload.
    // Parse to JSON.
    const payload = JSON.parse(atob(token.split('.')[1]));

    // Check payload expiration property (exp)  Remove it if it is.
    if (payload.exp < Date.now() / 1000) {
      // Date.now returns the number of milliseconds from units epic.
      // JWT uses seconds, so we need to divide it by 1k.
      localStorage.removeItem('token');
      token = null;
    }
  }
  return token;
}

// Decode user from token.
function getUserFromToken() {
  const token = getToken();

  // Parse token to a payload and use payload attribute 'user' to get the user.
  return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

function removeToken() {
  localStorage.removeItem('token');
}