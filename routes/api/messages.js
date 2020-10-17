const express = require('express');
const router = express.Router();
const messagesCtrl = require('../../controllers/messages');

router.post('/', checkAuth, messagesCtrl.create);

function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;