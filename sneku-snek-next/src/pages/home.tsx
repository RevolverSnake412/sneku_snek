'use client';

import React, { useState, useEffect, useContext } from 'react';
import PostList from '../components/Posts/PostList';
import PostForm from '../components/Posts/PostForm';
import End from '../components/Layout/End';
import postService from '../services/postService';

import Link from 'next/link';
import styles from '../assets/styles/Home.module.css'; 
import { AuthContext } from '@/services/AuthContext';

const CustomHome = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      const data = await postService.getPosts();
      setPosts(data);
    } catch (error) {
      setError("Failed to fetch posts");
    }
  };

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);

  if (!user) {
    return (
      <div className={styles.noauth}>
        <h1>You are not Connected ;(</h1>
        <p>
          Please <Link href="/login">Login</Link> or <Link href="/register">Register</Link> to view Posts.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.homecontainer}>
      <h1>Share or View Snakes</h1>
      <div className={styles.postformcontainer}>
        <PostForm fetchPosts={fetchPosts} />
      </div>
      <div className={styles.postlistcontainer}>
        <PostList posts={posts} error={error} refreshPosts={fetchPosts} />
      </div>
      <End />
      {error && <div>{error}</div>}
    </div>
  );
};

export default CustomHome;
