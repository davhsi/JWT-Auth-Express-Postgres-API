const express = require('express');
const Post = require('../models/Post');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Create a post
router.post('/', authMiddleware, async (req, res) => {
    const { title, description } = req.body;
    try {
        const post = await Post.create({ title, description, author: req.user.id });
        res.status(201).json(post);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll({ include: 'User' });
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get a single post by ID
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, { include: 'User' });
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a post
router.put('/:id', authMiddleware, async (req, res) => {
    const { title, description } = req.body;
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        // Check if the logged-in user is the author of the post
        if (post.author !== req.user.id) {
            return res.status(403).json({ message: 'Access denied. You are not the author.' });
        }

        post.title = title || post.title;
        post.description = description || post.description;

        await post.save();
        res.json(post);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a post
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        // Check if the logged-in user is the author of the post
        if (post.author !== req.user.id) {
            return res.status(403).json({ message: 'Access denied. You are not the author.' });
        }

        await post.destroy();
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
