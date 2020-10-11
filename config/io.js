const io = require('socket.io')();
const Message = require('../models/message');

io.on('connection', socket => {
  console.log('User has connected.')

  Message.find({}).sort({createdAt: -1})
    .limit(10).exec((err, messages) => {
      socket.emit('init', messages);
    })
    
  socket.on('send-message', (msg) => {
    console.log(msg);
    console.log('HITTING NEW MESSAGE');
    
    socket.broadcast.emit('push', msg);
  });
});

module.exports = io;