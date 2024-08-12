import React, { useState } from 'react';
import postService from '../../services/postService';
import PostFormCSS from '../../assets/styles/PostForm.module.css'

const PostForm = ({ fetchPosts }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set the image as a Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

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
        <button type="submit" className={PostFormCSS.submitButton}>
          Post
        </button>
      </div>
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
