import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const { username, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/auth/login' : '/auth/register';
    
    try {
      const res = await api.post(endpoint, formData);
      
      localStorage.setItem('token', res.data.token);
      
      alert(isLogin ? "Welcome back, Kodemaster!" : "Character Created! Welcome to the Kingdom.");
      navigate('/dashboard'); 
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed. Check your credentials.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>{isLogin ? '⚔️ PLAYER LOGIN' : '🛡️ NEW CHARACTER'}</h1>
        <p>{isLogin ? 'Enter the kingdom to continue your quest.' : 'Join the elite coders of Sahyadri.'}</p>
        
        <form onSubmit={onSubmit}>
          {!isLogin && (
            <input type="text" placeholder="Username" name="username" value={username} onChange={onChange} required />
          )}
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={onChange} required />
          <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} required />
          
          <button type="submit" className="auth-btn">
            {isLogin ? 'START GAME' : 'CREATE ACCOUNT'}
          </button>
        </form>

        <p className="toggle-text" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "New here? Create an account" : "Already a member? Login here"}
        </p>
      </div>
    </div>
  );
};

export default Auth;