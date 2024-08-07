import React, { useState } from 'react';
import postService from '../../services/postService';

const PostForm = ({ fetchPosts }) => {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postService.createPost({ text });
      setText('');
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default PostForm;
