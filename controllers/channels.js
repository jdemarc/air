const Channel = require('../models/channel');

module.exports = {
  create,
};

async function create(req, res) {
  //const channelExists = await Channel.findOne({ name });
  
  //if (channelExists) throw err

  const channel = new Channel(req.body);

  await channel.save();
  res.status(201).json(puppy);
}