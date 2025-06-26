import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/auth/login', {
        email,
        password,
      });

      const token = res.data.token;
      localStorage.setItem('authToken', token); // Store token
      setMessage('✅ Login successful!');
      onLogin && onLogin(token); // notify parent if needed
    } catch (err) {
      setMessage(err.response?.data?.message || '❌ Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={loginUser}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Login;
