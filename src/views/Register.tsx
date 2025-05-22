import React, { useState } from 'react';

function Register() {
  const [registerInfo, setRegisterInfo] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [btnDisabled, setBtnDisabled] = useState(false);

  const handleRegister = async () => {
    const res = await fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerInfo),
    });
    const data = await res.json();
    alert(data.message || data.error);
  };

  return (
    <>
      <form onSubmit={e => {
        e.preventDefault();

        setBtnDisabled(true);
        if (registerInfo.password !== registerInfo.confirmPassword) {
          alert("Confirm password is not correct");
          setBtnDisabled(false)
          return;
        }
        handleRegister()
          .then(() => setBtnDisabled(false));
      }}>
        <h2>🔐 Register</h2>
        <input placeholder="Username" onChange={e => setRegisterInfo({ ...registerInfo, username: e.target.value })} required />
        <input type="email" placeholder="Email" onChange={e => setRegisterInfo({ ...registerInfo, email: e.target.value })} required />
        <input type="password" placeholder="Password" onChange={e => setRegisterInfo({ ...registerInfo, password: e.target.value })} required />
        <input type="password" placeholder="Confirm password" onChange={e => setRegisterInfo({ ...registerInfo, confirmPassword: e.target.value })} required />
        <button type="submit" disabled={btnDisabled}>Register</button>
      </form>
    </>
  );
}

export default Register;
