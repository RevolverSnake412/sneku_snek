import React, { useState } from 'react';
import FooterCSS from '../../assets/styles/Footer.module.css';

const Footer = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={FooterCSS.footerContainer}>
      <div className={FooterCSS.getInTouch}>
        <h3>Get in touch!</h3>
        <div className={FooterCSS.socialLinks}>
          <a href="https://github.com/RevolverSnake412" target="_blank" rel="noopener noreferrer">
            <img src='https://cdn-icons-png.flaticon.com/512/25/25231.png' width='30px'/>
          </a>
          <a href="https://twitter.com/RevS412" target="_blank" rel="noopener noreferrer">
            <img src='https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/x-social-media-black-icon.png' width='30px'/>
          </a>
          <a href="https://telegram.org/revs412" target="_blank" rel="noopener noreferrer">
            <img src='https://static-00.iconduck.com/assets.00/telegram-icon-2048x1725-i4kw83ca.png' width='30px'/>
          </a>
          <a href="https://discord.com/users/1258157254058709074" target="_blank" rel="noopener noreferrer">
            <img src='https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/discord-round-black-icon.png' width='30px'/>
          </a>
          <a href="https://linkedin.com/revs412" target="_blank" rel="noopener noreferrer">
            <img src='https://static-00.iconduck.com/assets.00/linkedin-with-circle-icon-512x512-cvyrro5n.png' width='30px'/>
          </a>
        </div>
      </div>
      <div className={FooterCSS.newsletter}>
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <h3>Newsletter</h3>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <button type="submit">Submit</button>
          </form>
        ) : (
          <p>Thanks for subscribing!</p>
        )}
      </div>
    </div>
  );
};

export default Footer;
