import React, { useState } from 'react';
import { useNavigate as useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import LoginCSS from '../../assets/styles/Login.module.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.login({ email, password });
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={LoginCSS.login}>
      <div className={LoginCSS.left}>
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
      <div className={LoginCSS.right}>
        <p>text</p>
      </div>
    </div>
  );
};

export default Login;
