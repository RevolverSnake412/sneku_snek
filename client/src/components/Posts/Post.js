import React, { useState } from 'react';
import postService from '../../services/postService';

const Post = ({ post, refreshPosts }) => {
  const [likes, setLikes] = useState(post.likes.length);
  const [userLiked, setUserLiked] = useState(post.likes.includes(localStorage.getItem('user')));
  const [comments, setComments] = useState(post.comments || []);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleLike = async () => {
    try {
      const userId = localStorage.getItem('user');
      if (userLiked) {
        await postService.unlikePost(post._id);
        setLikes(likes - 1);
        setUserLiked(false);
      } else {
        await postService.likePost(post._id);
        setLikes(likes + 1);
        setUserLiked(true);
      }
      refreshPosts(); // Refresh the posts to reflect the new like/unlike status
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
      refreshPosts(); // Refresh the posts to reflect the new comment
    } catch (error) {
      console.error('Error adding comment:', error);
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
      {showComments && (
        <div>
          {comments.length > 0 ? comments.map((comment) => (
            <div key={comment._id} style={{ marginTop: '10px' }}>
              <strong>{comment.user.username}:</strong> {comment.text}
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
