const express = require('express');
const { createPost, getAllPosts, addComment, getPost } = require('../controllers/postController');
const uploadFileMiddleware = require('../middleware/filemiddleware');

const router = express.Router();

router.post('/create-post/:id', uploadFileMiddleware, createPost );
router.get('/all-posts', getAllPosts);
router.post('/addcomment', addComment);
router.get('/getpost/:id', getPost);

module.exports = router;