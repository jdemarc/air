const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/users');

router.get('/', usersCtrl.index);
router.post('/find', checkAuth, usersCtrl.find);
router.put('/update', checkAuth, usersCtrl.update);
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);

function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'Not Authorized'});
}


module.exports = router;