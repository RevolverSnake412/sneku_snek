import React, { useState, useEffect, useContext } from 'react';
import postService from '../../services/postService';
import { AuthContext } from '../../services/AuthContext';
import PostCSS from '../../assets/styles/Post.module.css';

const Post = ({ post, refreshPosts }) => {
  const [likes, setLikes] = useState(post.likes.length);
  const [userLiked, setUserLiked] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const userId = user ? user._id : null;
    if (userId) {
      setUserLiked(post.likes.some(like => like.user === userId));
    }
  }, [post.likes, user]);

  const handleLike = async () => {
    try {
      const userId = user ? user._id : null;
      if (!userId) return;

      if (userLiked) {
        await postService.unlikePost(post._id);
        setLikes(likes - 1);
        setUserLiked(false);
      } else {
        await postService.likePost(post._id);
        setLikes(likes + 1);
        setUserLiked(true);
      }
      refreshPosts();
    } catch (error) {
      console.error('Error liking/unliking post:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const newComment = await postService.commentOnPost(post._id, { text: commentText });
      setComments([newComment, ...comments]);
      setCommentText('');
      refreshPosts();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeletePost = async () => {
    try {
      await postService.deletePost(post._id);
      refreshPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await postService.deleteComment(post._id, commentId);
      setComments(comments.filter(comment => comment._id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className={PostCSS.postContainer}>
  <div className={PostCSS.postHeader}>
    <div className={PostCSS.username}>{post.user.username}</div>
    {user && user._id === post.user._id && (
      <button onClick={handleDeletePost} className={PostCSS.deleteButton}>
        Delete
      </button>
    )}
  </div>
  <div className={PostCSS.postDate}>{formatDate(post.date)}</div>
  <div className={PostCSS.postText}>{post.text}</div>
  {post.image && (
    <div className={PostCSS.imageContainer}>
      <img src={post.image} alt="Post Image" className={PostCSS.postImage} />
    </div>
  )}
  <div className={PostCSS.likecommentButtons}>
    <button onClick={handleLike} className={PostCSS.likeButton}>
      {userLiked ? 'Unlike' : 'Like'}
    </button>
    <div className={PostCSS.commentsToggle}>
      <button onClick={() => setShowComments(!showComments)} className={PostCSS.commentsButton}>
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </button>
    </div>
  </div>
  <div className={PostCSS.likeCount}>Liked by {likes} people</div>
  {showComments && (
    <div className={PostCSS.commentsSection}>
      {comments.length > 0 ? comments.map((comment) => (
        <div key={comment._id} className={PostCSS.comment}>
          <div className={PostCSS.commentContent}>
            <strong>{comment.user.username}:</strong> {comment.text}
          </div>
          {user && user._id === comment.user._id && (
            <button onClick={() => handleDeleteComment(comment._id)} className={PostCSS.deleteCommentButton}>
              Delete
            </button>
          )}
        </div>
      )) : <p className={PostCSS.nocomment}>No comments yet, be the first!</p>}
      <form onSubmit={handleCommentSubmit} className={PostCSS.commentForm}>
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a nice comment"
          className={PostCSS.commentInput}
        />
        <button type="submit" className={PostCSS.submitCommentButton}>
          Comment
        </button>
      </form>
    </div>
  )}
</div>
  );
};
export default Post;
