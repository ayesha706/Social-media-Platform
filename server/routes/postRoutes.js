const express = require('express');
const { createPost, getAllPosts, addComment, getPost, likePost } = require('../controllers/postController');
const uploadFileMiddleware = require('../middleware/filemiddleware');
const {verifyJWT} = require('../middleware/verifyJWT.js');
const router = express.Router();

router.post('/create-post/:id', uploadFileMiddleware, createPost );
router.get('/all-posts', getAllPosts);
router.post('/addcomment', addComment);
router.get('/getpost/:id', getPost);
router.put('/likepost/:id', verifyJWT, likePost);

module.exports = router;