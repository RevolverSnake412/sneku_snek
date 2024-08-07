import React, { useState, useEffect, useContext } from 'react';
import PostList from '../Posts/PostList';
import PostForm from '../Posts/PostForm';
import postService from '../../services/postService';
import { AuthContext } from '../Layout/AuthContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { user } = useContext(AuthContext);
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
    if (user) {
      fetchPosts();
    }
  }, [user]);

  if (!user) {
    return (
      <div>
        <h1>You are not Connected!</h1>
        <p>
          Please <Link to="/login">Login</Link> or <Link to="/register">Register</Link> to view Posts.
        </p>
      </div>
    );
  }

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
