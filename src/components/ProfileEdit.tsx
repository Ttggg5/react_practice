import React, { useState } from 'react';

const ProfileEdit = () => {
  const [form, setForm] = useState({ avatar_url: '', bio: '', location: '' });

  const updateProfile = async () => {
    await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(form),
    });
  };

  return (
    <div>
      <input placeholder="Avatar URL" onChange={e => setForm({ ...form, avatar_url: e.target.value })} />
      <textarea placeholder="Bio" onChange={e => setForm({ ...form, bio: e.target.value })} />
      <input placeholder="Location" onChange={e => setForm({ ...form, location: e.target.value })} />
      <button onClick={updateProfile}>Save</button>
    </div>
  );
};