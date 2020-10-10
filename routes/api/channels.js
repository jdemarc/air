const express = require('express');
const router = express.Router();
const channelsCtrl = require('../../controllers/channels');

router.use(require('../../config/auth')); // Maybe not needed?
router.post('/', checkAuth, channelsCtrl.create);

// Helper func.
function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;
