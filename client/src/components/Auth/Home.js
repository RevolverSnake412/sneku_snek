import React, { useState, useEffect, useContext } from 'react';
import PostList from '../Posts/PostList';
import PostForm from '../Posts/PostForm';
import End from '../Layout/End';
import postService from '../../services/postService';
import { AuthContext } from '../../services/AuthContext';
import { Link } from 'react-router-dom';
import HomeCSS from '../../assets/styles/Home.module.css'

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
      <div className={HomeCSS.noauth}>
        <h1>You are not Connected ;(</h1>
        <p>
          Please <Link to="/login">Login</Link> or <Link to="/register">Register</Link> to view Posts.
        </p>
      </div>
    );
  }

  return (
    <div className={HomeCSS.homecontainer}>
      <h1>Share or View Snakes</h1>
      <div className={HomeCSS.postformcontainer}>
        <PostForm fetchPosts={fetchPosts} />
      </div>
      <div className={HomeCSS.postlistcontainer}>
        <PostList posts={posts} error={error} refreshPosts={fetchPosts} />
      </div>
      <End />
      {error && <div>{error}</div>}
    </div>
  );
};

export default Home;
