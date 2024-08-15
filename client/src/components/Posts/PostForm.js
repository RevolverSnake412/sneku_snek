import React, { useState } from 'react';
import postService from '../../services/postService';
import PostFormCSS from '../../assets/styles/PostForm.module.css'

const PostForm = ({ fetchPosts }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const fileSizeLimit = 5 * 1024 * 1024; // 5MB limit
  
    if (file && file.size > fileSizeLimit) {
      setErrorMessage('File size exceeds 5MB limit. Please upload a smaller file.');
      return;
    }
  
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setErrorMessage('');
      };
      reader.readAsDataURL(file);
    } else {
      setErrorMessage('Unsupported file type. Please upload an image.');
    }
  };

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postService.createPost({ text, image });
      setText('');
      setImage(null);
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
  <div className={PostFormCSS.postform}>
    <form onSubmit={handleSubmit}>
      <div className={PostFormCSS.textFieldContainer}>
        <input
          type="text"
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          className={PostFormCSS.textField}
        />
        <button
        type="submit"
        className={PostFormCSS.submitButton}
        disabled={!text.trim()}>
          Post
        </button>
      </div>
      {errorMessage && <p className={PostFormCSS.error}>{errorMessage}</p>}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className={PostFormCSS.fileInput}
      />
      {image && (
        <div className={PostFormCSS.previewContainer}>
          <img src={image} alt="Preview" />
        </div>
      )}
    </form>
  </div>  
  );
};

export default PostForm;
