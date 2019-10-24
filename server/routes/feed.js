const express = require('express');
const { body } = require('express-validator/check');
const router = express.Router();
const auth = require('../middleware/is-auth');
const { getPosts ,
        createPost ,
        getSinglePost,
        updatePost,
        deletePost
        } = require('../controllers/feed');

// GET : /feed/posts 
router.get('/posts',auth,getPosts);

//POST : /feed/create-post 
router.post('/create-post',auth,[
    body('title')
    .trim()
    .isLength({ min : 5 }),
    body('content')
    .trim()
    .isLength({ min : 5 })
],createPost );

// GET : /feed/posts/:postId
router.get('/posts/:postId',auth,getSinglePost);

// PUT : /feed/update-post/:postId
router.put('/update-post/:postId',auth,updatePost);

// DELETE : /feed/delete-post/:postId
router.delete('/delete-post/:postId',auth,deletePost);

module.exports = router;