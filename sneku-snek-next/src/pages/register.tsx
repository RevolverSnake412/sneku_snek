'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import authService from '../services/authService';
import RegisterCss from '../assets/styles/Register.module.css'; 
import '../../src/app/globals.css'

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await authService.register({ username, email, password });
      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='centeredPage'>
      <div className={RegisterCss.register}>
        <div className={RegisterCss.submitfield}>
          <form onSubmit={handleSubmit}>
            <h4>We are <span>Sneku Snek</span>!</h4>
            <p>Register now to join the Sssnake Community!</p>
            <div className={RegisterCss.floatinglabel}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className={RegisterCss.floatinglabel}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={RegisterCss.floatinglabel}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className={RegisterCss.submitBtn}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
