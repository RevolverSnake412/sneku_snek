const express = require('express');
const {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  commentOnPost,
  deleteComment,
} = require('../controllers/postController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, createPost)
  .get(protect, getPosts);

router.route('/:id')
  .put(protect, updatePost)
  .delete(protect, deletePost);

router.route('/like/:id').put(protect, likePost);
router.route('/unlike/:id').put(protect, unlikePost);
router.route('/comment/:id').post(protect, commentOnPost);
router.route('/comment/:id/:comment_id').delete(protect, deleteComment);

module.exports = router;
