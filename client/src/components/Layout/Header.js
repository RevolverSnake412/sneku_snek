// Header.js
import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
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
            <span>{user.username}</span>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <div className={HeaderCSS.right}>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
