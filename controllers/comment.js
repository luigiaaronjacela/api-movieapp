const Comment = require('../models/Comment');

exports.addComment = async (req, res) => {
  try {
    const comment = new Comment({
      movie: req.body.movieId,
      user: req.user.id,
      text: req.body.text
    });

    await comment.save();
    await comment.populate('user', 'username'); // populate username for frontend

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ movie: req.params.movieId })
      .populate('user', 'username')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const deleted = await Comment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Comment not found' });
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};