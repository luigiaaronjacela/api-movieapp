const Comment = require('../models/Comment');

// Add a comment
exports.addComment = async (req, res) => {
  try {
    const comment = new Comment({
      movie: req.body.movieId,
      user: req.user.id,
      text: req.body.text
    });

    await comment.save();
    await comment.populate('user', 'username'); // populate username for frontend

    res.status(201).json({ comment }); // wrap it in { comment } for consistency
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all comments for a movie
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

// Update a comment (MISSING in your code)
exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    if (comment.user.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not authorized to update this comment' });

    comment.text = req.body.text;
    await comment.save();
    await comment.populate('user', 'username');

    res.json({ updatedComment: comment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    const isOwner = comment.user.toString() === req.user.id;
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    await comment.remove();

    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};