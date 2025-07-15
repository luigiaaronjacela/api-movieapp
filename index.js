const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
app.use(express.json());

// Hardcoded config
const PORT = 4000;
const MONGO_URI = 'mongodb+srv://admin123:admin123@b546.wenww9x.mongodb.net/movieApp?retryWrites=true&w=majority&appName=b546';
const JWT_SECRET = 'movieApp';
global.JWT_SECRET = JWT_SECRET;


const corsOptions = {
    //to be updated when we connect this to our client
    origin: ['http://localhost:3000', 'http://localhost:4000'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));



// Connect DB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Correct routes
const authRoutes = require('./routes/user');
const movieRoutes = require('./routes/movie');
const commentRoutes = require('./routes/comment');

// Routes
app.use('/users', authRoutes);
app.use('/movies', movieRoutes);
app.use('/comments', commentRoutes);

// Sever Gateway Response
app.listen(PORT, () => {
  console.log(`API is now online on port ${PORT}`);
});

module.exports = { app, mongoose };