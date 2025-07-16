const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie');
const { verify, verifyAdmin } = require('../auth'); // make sure these middleware exist
const upload = require('../middlewares/upload');

// [POST] Create Movie
router.post(
  '/addMovie',
  verify,
  verifyAdmin,
  upload.single('image'),
  movieController.createMovie
);

// [GET] All Movies
router.get('/getMovies', movieController.getMovies);

// [GET] Single Movie
router.get('/getMovie/:id', movieController.getMovieById);

// [PUT] Update Movie
router.put(
  '/updateMovie/:id',
  verify,
  verifyAdmin,
  upload.single('image'),
  movieController.updateMovie
);

// [DELETE] Delete Movie
router.delete(
  '/deleteMovie/:id',
  verify,
  verifyAdmin,
  movieController.deleteMovie
);

module.exports = router;