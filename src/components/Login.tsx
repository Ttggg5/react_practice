import React, { useState } from 'react';

function Login() {
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const [btnDisabled, setBtnDisabled] = useState(false);

  const handleLogin = async () => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // 🔐 important
      body: JSON.stringify(loginInfo),
    });
    const data = await res.json();
    alert(data.message || data.error);
  };

  return (
    <>
      <form onSubmit={e => {
        e.preventDefault();

        setBtnDisabled(true);
        handleLogin()
          .then(() => setBtnDisabled(false));
      }}>
        <h2>🔑 Login</h2>
        <input type="email" placeholder="Email" onChange={e => setLoginInfo({ ...loginInfo, email: e.target.value })} required />
        <input type="password" placeholder="Password" onChange={e => setLoginInfo({ ...loginInfo, password: e.target.value })} required />
        <button type="submit" disabled={btnDisabled}>Login</button>
        <a href='/forgot-password'>forgot password</a>
      </form>
    </>
  );
}

export default Login;
