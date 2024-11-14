// controllers/postController.js
const Post = require('../models/Post');

exports.createPost = async (req, res) => {
    const { title, description } = req.body;
    try {
        const post = await Post.create({ title, description, author: req.user.id });
        res.status(201).json(post);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({ include: 'User' });
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, { include: 'User' });
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updatePost = async (req, res) => {
    const { title, description } = req.body;
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

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
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        if (post.author !== req.user.id) {
            return res.status(403).json({ message: 'Access denied. You are not the author.' });
        }

        await post.destroy();
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
