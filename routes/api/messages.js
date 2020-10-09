const express = require('express');
const router = express.Router();
const messagesCtrl = require('../../controllers/messages');

/*---------- Protected Routes ----------*/
// Process the token for only the routes below
router.use(require('../../config/auth'));
router.post('/', checkAuth, messagesCtrl.create);

// Helper func.
function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;