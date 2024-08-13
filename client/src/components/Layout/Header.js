// Header.js
import React, { useContext } from 'react';
import { AuthContext } from '../../services/AuthContext';
import HeaderCSS from '../../assets/styles/Header.module.css'

const Header = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('Header must be used within an AuthProvider');
  }

  const { user, logout } = context;

  return (
    <div className={HeaderCSS.header}>
      <header>
        <div><a href="/">Sneku Snek</a></div>
        {user ? (
          <div>
            <a href="/">Home</a>
            <a href="/about">About Us</a>
            <span>{user.username}</span>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <div className={HeaderCSS.right}>
            <a href="/">Home</a>
            <a href="/about">About Us</a>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
