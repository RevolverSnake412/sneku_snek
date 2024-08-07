import React, { useState, useEffect, useContext } from 'react';
import postService from '../../services/postService';
import { AuthContext } from '../../components/Layout/AuthContext';

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

  return (
    <div style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
      <div style={{ fontWeight: 'bold' }}>{post.user.username}</div>
      <div>{post.text}</div>
      <div style={{ color: 'gray' }}>{likes} Likes</div>
      <button onClick={handleLike}>
        {userLiked ? 'Unlike' : 'Like'}
      </button>
      <button onClick={() => setShowComments(!showComments)}>
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </button>
      {user && user._id === post.user._id && (
        <button onClick={handleDeletePost}>Delete Post</button>
      )}
      {showComments && (
        <div>
          {comments.length > 0 ? comments.map((comment) => (
            <div key={comment._id} style={{ marginTop: '10px' }}>
              <strong>{comment.user.username}:</strong> {comment.text}
              {user && user._id === comment.user._id && (
                <button onClick={() => handleDeleteComment(comment._id)}>Delete Comment</button>
              )}
            </div>
          )) : <p>No comments yet</p>}
          <form onSubmit={handleCommentSubmit}>
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment"
            />
            <button type="submit">Comment</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Post;
