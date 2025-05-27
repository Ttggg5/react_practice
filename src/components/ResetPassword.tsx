import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const ResetPassword = () => {
  const [params] = useSearchParams();
  const token = params.get('token') || '';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const submit = async () => {
    if (password !== confirmPassword) {
        setMessage("Confirm password is not correct");
        return;
    }

    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
      <input type="password" placeholder='Confirm password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
      <button onClick={submit}>Reset</button>
      <p>{message}</p>
    </div>
  );
};

export default ResetPassword;