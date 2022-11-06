const moogoose = require('mongoose');
require('dotenv').config();


// connect to mongodb
function connectDB() {
    moogoose.connect('mongodb://localhost:27017/Blogging-API');

    moogoose.connection.on('connected', () => {
        console.log('Connected to MongoDB successfully');
    });

    moogoose.connection.on('error', (err) => {
        console.log('Error connecting to MongoDB', err);
    })
};

module.exports = connectDB;