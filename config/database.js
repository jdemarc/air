const mongoose = require('mongoose');

//mongoose.connect(process.env.DATABASE_URL, ...)
mongoose.connect('mongodb://localhost/air', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

const db = mongoose.connection;

db.on('connected', function () {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
})