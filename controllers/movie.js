const Movie = require('../models/Movie');

// [POST] Create Movie
exports.createMovie = async (req, res) => {
  try {
    const { title, director, year, genre, description } = req.body;
    const image = req.file ? req.file.filename : '';

    const movie = new Movie({
      title,
      director,
      year,
      genre,
      description,
      image
    });

    await movie.save();
    res.status(201).json({ message: 'Movie created', movie });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// [GET] All Movies
exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// [GET] Movie by ID
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// [PUT] Update Movie
exports.updateMovie = async (req, res) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const movie = await Movie.findByIdAndUpdate(req.params.id, updateData, {
      new: true
    });

    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    res.status(200).json({ message: 'Movie updated', movie });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// [DELETE] Delete Movie
exports.deleteMovie = async (req, res) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};