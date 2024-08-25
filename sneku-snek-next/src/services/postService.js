import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL + '/api/posts/';

const getConfig = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || !user.token) {
    console.error('No user token found');
    return null;
  }

  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
  };
};

const createPost = async (postData) => {
  const config = getConfig();
  if (!config) return null;

  try {
    const response = await axios.post(API_URL, postData, config);
    return response.data;
  } catch (error) {
    console.error('Error creating post', error);
    return null;
  }
};

const getPosts = async () => {
  const config = getConfig();
  if (!config) return [];

  try {
    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts', error);
    return [];
  }
};

const updatePost = async (postId, postData) => {
  const config = getConfig();
  if (!config) return null;

  try {
    const response = await axios.put(`${API_URL}${postId}`, postData, config);
    return response.data;
  } catch (error) {
    console.error('Error updating post', error);
    return null;
  }
};

const deletePost = async (postId) => {
  const config = getConfig();
  if (!config) return null;

  try {
    const response = await axios.delete(`${API_URL}${postId}`, config);
    return response.data;
  } catch (error) {
    console.error('Error deleting post', error);
    return null;
  }
};

const likePost = async (postId) => {
  const config = getConfig();
  if (!config) return null;

  try {
    const response = await axios.put(`${API_URL}like/${postId}`, {}, config);
    return response.data;
  } catch (error) {
    console.error('Error liking post', error);
    return null;
  }
};

const unlikePost = async (postId) => {
  const config = getConfig();
  if (!config) return null;

  try {
    const response = await axios.put(`${API_URL}unlike/${postId}`, {}, config);
    return response.data;
  } catch (error) {
    console.error('Error unliking post', error);
    return null;
  }
};

const commentOnPost = async (postId, commentData) => {
  const config = getConfig();
  if (!config) return null;

  try {
    const response = await axios.post(`${API_URL}comment/${postId}`, commentData, config);
    return response.data;
  } catch (error) {
    console.error('Error commenting on post', error);
    return null;
  }
};

const deleteComment = async (postId, commentId) => {
  const config = getConfig();
  if (!config) return null;

  try {
    const response = await axios.delete(`${API_URL}comment/${postId}/${commentId}`, config);
    return response.data;
  } catch (error) {
    console.error('Error deleting comment', error);
    return null;
  }
};

const postService = {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  commentOnPost,
  deleteComment,
};

export default postService;
