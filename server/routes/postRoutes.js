const express = require('express');
const { createPost, getAllPosts, addComment, getPost, likePost, followUser } = require('../controllers/postController');
const uploadFileMiddleware = require('../middleware/filemiddleware');
const {verifyJWT} = require('../middleware/verifyJWT.js');
const router = express.Router();

router.post('/create-post/:id', uploadFileMiddleware, createPost );
router.get('/all-posts', getAllPosts);
router.post('/addcomment', addComment);
router.get('/getpost/:id', getPost);
router.put('/likepost/:id', verifyJWT, likePost);
router.put('/follow/:id', verifyJWT, followUser);
module.exports = router;