const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = function(req, res, next) {
  
  // Check token being sent
  // .get allows access to header -- 'Authorization'
  let token = req.get('Authorization') || req.query.token;
  if (token) {

    // Remove leading space from token.
    token = token.replace('Bearer ', '');

    // Payload = decoded
    jwt.verify(token, SECRET, function(err, decoded) {
      if (err) {
        next(err);
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } else {
    // No token, still need to move on through code.
    next();
  }
};