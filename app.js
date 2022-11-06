const express = require('express');
const router = require('./routes/userRoutes');
const blogRouter = require('./routes/blogRoutes');
const passport = require('passport');

require('./Database/connect')(); // Connect to MongoDB
require('dotenv').config();

// Register passport
require("./passport");

const app = express();

const PORT = 4000;

//Middleware
app.use(express.json());

// renders the home page
app.get('/', (req, res) => {
    res.send('Welcome to the Blogging-API');
});

//routes
app.use('/blogs', blogRouter);
app.use('/', router);





app.listen(PORT, () => {
    console.log(`Speak for the Server is running on port ${PORT}`)
})
