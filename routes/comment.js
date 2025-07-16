const express = require('express');
const router = express.Router();
const {
  addComment,
  getComments,
  updateComment,
  deleteComment
} = require('../controllers/comment'); // Make sure to export `updateComment` in your controller

const { verify } = require('../auth'); // Assumes verify sets `req.user`

// @route   POST /comments/addComment
// @desc    Add a comment to a movie
router.post('/addComment', verify, addComment);

// @route   GET /comments/getComments/:movieId
// @desc    Get all comments for a movie
router.get('/getComments/:movieId', getComments);

// @route   PUT /comments/updateComment/:id
// @desc    Update a comment by ID (only by owner)
router.put('/updateComment/:id', verify, updateComment);

// @route   DELETE /comments/deleteComment/:id
// @desc    Delete a comment by ID (only by owner)
router.delete('/deleteComment/:id', verify, deleteComment);

module.exports = router;