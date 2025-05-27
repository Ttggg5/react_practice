import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Profile {
  id: number;
  username: string;
  email: string;
  bio?: string;
  location?: string;
}

const ProfileView: React.FC = () => {
  // Extract `id` from route parameters
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('No user ID provided.');
      return;
    }

    // Fetch user profile by ID
    fetch(`/api/profile/${id}`, { credentials: 'include' })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || 'Failed to fetch profile');
        }
        return res.json();
      })
      .then((data: Profile) => setProfile(data))
      .catch((err: Error) => setError(err.message));
  }, [id]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!profile) return <p>Loading profile...</p>;

  return (
    <div>
      <img src={`/api/profile/avatar/${id}`} width={200} alt="avatar" />
      <h2>{profile.username}</h2>
      {profile.bio && <p>{profile.bio}</p>}
      {profile.location && <p>{profile.location}</p>}
    </div>
  );
};

export default ProfileView;
