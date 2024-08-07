import React, { useState, useEffect } from 'react';
import PostList from '../components/Posts/PostList';
import PostForm from '../components/Posts/PostForm';
import postService from '../services/postService';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      const data = await postService.getPosts();
      setPosts(data);
    } catch (error) {
      setError('Failed to fetch posts');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <PostForm fetchPosts={fetchPosts} />
      <PostList posts={posts} error={error} refreshPosts={fetchPosts} />
      {error && <div>{error}</div>}
    </div>
  );
};

export default Home;
