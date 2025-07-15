const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie');
const { verify, verifyAdmin } = require('../auth');

router.post('/addMovie', verify, verifyAdmin, movieController.createMovie);
router.get('/getMovies', movieController.getMovies);
router.get('/getMovie/:id', movieController.getMovieById);
router.put('/updateMovie/:id', verify, verifyAdmin, movieController.updateMovie);
router.delete('/deleteMovie/:id', verify, verifyAdmin, movieController.deleteMovie);

module.exports = router;