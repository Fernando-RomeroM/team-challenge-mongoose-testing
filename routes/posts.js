const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.post('/create', async (req, res) => {
  try {
    const { title, body } = req.body;
    const newPost = new Post({ title, body });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/id/:_id', async (req, res) => {
  try {
    const post = await Post.findById(req.params._id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/title/:title', async (req, res) => {
  try {
    const post = await Post.findOne({ title: req.params.title });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/id/:_id', async (req, res) => {
  try {
    const { title, body } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(req.params._id, { title, body }, { new: true });
    if (!updatedPost) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/id/:_id', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params._id);
    if (!deletedPost) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json({ message: 'Post deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
