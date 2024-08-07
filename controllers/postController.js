const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  const { text } = req.body;

  const post = await Post.create({
    user: req.user._id,
    text,
  });

  res.status(201).json(post);
};

exports.getPosts = async (req, res) => {
  const posts = await Post.find().populate('user', 'username').sort({ date: -1 });
  res.json(posts);
};

exports.updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'User not authorized' });
  }

  post.text = req.body.text || post.text;

  const updatedPost = await post.save();
  res.json(updatedPost);
};

exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'User not authorized' });
  }

  await post.remove();
  res.json({ message: 'Post removed' });
};

exports.likePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post.likes.some(like => like.user.toString() === req.user._id.toString())) {
    return res.status(400).json({ message: 'Post already liked' });
  }

  post.likes.unshift({ user: req.user._id });
  await post.save();
  res.json(post.likes);
};

exports.unlikePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post.likes.some(like => like.user.toString() === req.user._id.toString())) {
    return res.status(400).json({ message: 'Post has not yet been liked' });
  }

  post.likes = post.likes.filter(({ user }) => user.toString() !== req.user._id.toString());
  await post.save();
  res.json(post.likes);
};

exports.commentOnPost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  const comment = {
    user: req.user._id,
    text: req.body.text,
  };

  post.comments.unshift(comment);
  await post.save();

  // Populate user in the newly added comment
  await post.populate('comments.user', 'username');

  res.json(post.comments[0]);  // Return the new comment
};


exports.deleteComment = async (req, res) => {
  const post = await Post.findById(req.params.id);

  const comment = post.comments.find(
    (comment) => comment.id === req.params.comment_id
  );

  if (!comment) {
    return res.status(404).json({ message: 'Comment does not exist' });
  }

  if (comment.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'User not authorized' });
  }

  post.comments = post.comments.filter(
    ({ id }) => id !== req.params.comment_id
  );

  await post.save();
  res.json(post.comments);
};
