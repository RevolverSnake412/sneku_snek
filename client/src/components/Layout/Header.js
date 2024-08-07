// Header.js
import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';

const Header = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('Header must be used within an AuthProvider');
  }

  const { user, logout } = context;

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #ccc' }}>
      <div><a href="/">Sneku Snek</a></div>
      {user ? (
        <div>
          <span>{user.username}</span>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
      )}
    </header>
  );
};

export default Header;
