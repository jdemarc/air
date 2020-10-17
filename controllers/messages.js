const Message = require('../models/message');

module.exports = {
  create,
};

async function create(req, res) {
  const newMessage = await Message.create(req.body)
  res.status(200).json(newMessage);
}