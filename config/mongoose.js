const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quora_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to mongodb"));

db.once('open', function() {
    console.log('Connected to db :: MongoDb');
});

module.exports = db;