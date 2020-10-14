const io = require('socket.io')();
const Message = require('../models/message');
//const messageCtrl = require('../controllers/messages')

const users = {};

io.on('connection', socket => {
  console.log('User has connected');
  socket.on("sign-on", username => {
    const user = {
      name: username,
      id: socket.id
    };
    
    users[socket.id] = user;
    io.emit("connected", user);
    io.emit("users", Object.values(users));
  });

  ///
  Message.find({}).sort({createdAt: -1})
    .limit(10).exec((err, messages) => {
      socket.emit('init', messages);
    })
  
  ///
  socket.on('message', (msg) => {
    socket.broadcast.emit('push', msg);
  });

  socket.on('disconnect', () => {
    delete users[socket.id]
    io.emit('disconnected', socket.id)
  });
});

module.exports = io;