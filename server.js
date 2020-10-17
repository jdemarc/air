const express = require('express');
const app = express();
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cors = require('cors');
const http = require('http');

const port = process.env.PORT || 3001;

const io = require('./config/io');
const server = http.Server(app)
io.attach(server);


require('dotenv').config();

// Connect to database.
require('./config/database');

app.use(cors());
app.use(logger('dev'));

// Middleware that creates req.body
app.use(express.json());

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));


// Routes
app.use(require('./config/auth'));
app.use('/api/users', require('./routes/api/users'));

//Only process tokens for below routes.

// Mount auth middleware to process JWTs.
app.use('/api/messages', require('./routes/api/messages.js'));


// Allow for proper client-side routing.
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(port, function() {
  console.log(`Listening on port ${port}`)
});