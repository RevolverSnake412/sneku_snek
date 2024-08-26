
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import authService from '../services/authService';
import LoginCSS from '../assets/styles/Login.module.css'; 
import '../../src/app/globals.css'
const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.login({ email, password });
      router.push('/');
    } catch (error) {
        setError('Invalid email or password.');
    }
  };
     


  return (
    <div className='centeredPage'>
      <div className={LoginCSS.login}>
        <div className={LoginCSS.submitfield}>
          <form onSubmit={handleSubmit}>
            <h4>Welcome back to <span>Sneku Snek</span>!</h4>
            <p>Log in to your account to view today&apos;s snakes.</p>
            <div className={LoginCSS.floatinglabel}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={LoginCSS.floatinglabel}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className={LoginCSS.error}>{error}</p>}
            <button type="submit" className={LoginCSS.submitBtn}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
