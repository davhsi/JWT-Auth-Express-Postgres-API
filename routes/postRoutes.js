// routes/post.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const postController = require('../controllers/postController');

router.post('/', authMiddleware, postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', authMiddleware, postController.updatePost);
router.delete('/:id', authMiddleware, postController.deletePost);

module.exports = router;
