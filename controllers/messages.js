const Message = require('../models/message');
// const User = require('../models/user');

module.exports = {
  create,
  // index
};

async function create(req, res) {
  const newMessage = await Message.create(req.body)
  res.status(200).json(newMessage);
}