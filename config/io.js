const io = require('socket.io')();
const Message = require('../models/message');

const users = {};

io.on('connection', socket => {

  // Generate users and store them in 'users' object to keep track of online users.
  socket.on("sign-on", username => {
    const user = {
      name: username,
      id: socket.id
    };
    
    users[socket.id] = user;

    io.emit("connected", user);
    io.emit("users", Object.values(users));
  });

  // Emit the last 10 messages to all users.
  Message.find({}).sort({createdAt: -1})
    .limit(10).exec((err, messages) => {
      socket.emit('init', messages);
    })
  
  // Emit a new message to all users.
  socket.on('message', (msg) => {
    socket.broadcast.emit('push', msg);
  });

  socket.on('disconnect', () => {
    delete users[socket.id]
    io.emit('disconnected', socket.id)
  });
});

module.exports = io;