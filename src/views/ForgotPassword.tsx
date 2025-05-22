import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const submit = async () => {
    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <input value={email} placeholder='Email' onChange={e => setEmail(e.target.value)} />
      <button onClick={submit}>Send Reset Link</button>
      <p>{message}</p>
    </div>
  );
};

export default ForgotPassword;