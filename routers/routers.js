const express = require('express')
const postcontroller = require('../controller/postreq')


const router = express.Router();


// http://localhost:4000
router.get('/', postcontroller.getall);

// http://localhost:4000/post
router.post('/post',postcontroller.createPost);

// http://localhost:4000/posts/id
router.delete('/posts/:id', postcontroller.deletePost);

// http://localhost:4000/posts/id
// Update a post by ID
router.put('/posts/:id', postcontroller.updatePost);

// notworking
router.delete('/posts/delete', postcontroller.deleteAllPosts);

exports.geti = (req, res) => {
    // res.send("hey whats up from express")
}





module.exports = router