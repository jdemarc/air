const Message = require('../models/message');

module.exports = {
  create,
  index
};

async function create(req, res) {
  req.body.user = req.body.id;
  
  try {
    await Message.create(req.body);
  } catch (err) {
    res.json({err});
  }
}

async function index(req, res) {
  const messages = await Message.find({}).limit(10);
  res.status(200).json(messages);
}