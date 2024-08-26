import React from 'react';
import NotFoundCSS from '../../assets/styles/404.module.css';

const NotFound = () => {
  return (
    <div className='centered-page'>
        <div className={NotFoundCSS.notFoundInside}>
            <h1>404</h1>
            <p>Oops! The page you're looking for doesn't exist.</p>
            <a href="/" className={NotFoundCSS.homeLink}>Go back to Home</a>
        </div>
    </div>
  );
};

export default NotFound;
