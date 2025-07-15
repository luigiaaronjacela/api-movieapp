const express = require('express');
const router = express.Router();
const { addComment, getComments, deleteComment } = require('../controllers/comment');
const { verify } = require('../auth');

router.post('/addComment', verify, addComment);
router.get('/getComments/:movieId', getComments);
router.delete('/deleteComment/:id', verify, deleteComment);

module.exports = router;