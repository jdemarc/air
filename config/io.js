const io = require('socket.io')();
const Message = require('../models/message');

const users = {};
io.on('connection', socket => {
  socket.on('signon', username => {
    const user = {
      name: username,
      id: socket.id
    };

    users[socket.id] = user;

    io.emit('users', Object.values(users));
  });

  Message.find({}).sort({createdAt: -1})
    .limit(10).exec((err, messages) => {
      socket.emit('init', messages);
    })
    
  socket.on('message', (msg) => {
    socket.broadcast.emit('push', msg);
  });

  socket.on('disconnect', () => {
    const username = users[socket.id];
    delete username;
    io.emit("disconnected", socket.id);
  });
});

module.exports = io;