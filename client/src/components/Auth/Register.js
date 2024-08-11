import React, { useState } from 'react';
import { useNavigate as useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import RegisterCSS from '../../assets/styles/Register.module.css'

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register({ username, email, password });
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='centered-page'>
      <div className={RegisterCSS.register}>
        <div className={RegisterCSS.submitfield}>
        <form onSubmit={handleSubmit}>
          <h4>We are <span>Sneku Snek</span>!</h4>
          <p>Register now to join the Sssnake Community!</p>
          <div className={RegisterCSS.floatinglabel}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={RegisterCSS.floatinglabel}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={RegisterCSS.floatinglabel}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
