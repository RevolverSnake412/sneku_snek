import React from 'react';
import EndCSS from '../../assets/styles/End.module.css'

const End = () => {
  return (
    <div className={EndCSS.end}>
      <footer>
        <p>Congratulations! You've reached the end</p>
        <p>Read more about us in <a href="/about">Here</a></p>
      </footer>
    </div>
  );
};

export default End;
