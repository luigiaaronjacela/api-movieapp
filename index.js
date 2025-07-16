const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(express.json());

// Create /uploads folder if not exists
const uploadPath = './uploads';
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Config
const PORT = 4000;
const MONGO_URI = 'mongodb+srv://admin123:admin123@b546.wenww9x.mongodb.net/movieApp?retryWrites=true&w=majority&appName=b546';
const JWT_SECRET = 'movieApp';
global.JWT_SECRET = JWT_SECRET;

// CORS
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:4000'],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Serve uploaded images
app.use('/uploads', express.static('uploads'));

// Connect DB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
const authRoutes = require('./routes/user');
const movieRoutes = require('./routes/movie');
const commentRoutes = require('./routes/comment');

app.use('/users', authRoutes);
app.use('/movies', movieRoutes);
app.use('/comments', commentRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`API is now online on port ${PORT}`);
});

module.exports = { app, mongoose };