import React from 'react';
import Post from './Post';

const PostList = ({ posts, error, refreshPosts }) => {
  if (error) {
    return <div>{error}</div>;
  }

  if (!posts || posts.length === 0) {
    return <div>No posts available</div>;
  }

  return (
    <div>
      {posts.map((post) => (
        <Post key={post._id} post={post} refreshPosts={refreshPosts} />
      ))}
    </div>
  );
};

export default PostList;
