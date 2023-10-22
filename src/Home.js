import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setError('');
  };

  const handleSearch = () => {
    if (username.trim() === '') {
      setError('Please enter a GitHub username.');
    } else {
      navigate(`/user/${username}`);
    }
  };

  return (
    <div>
      <h1>GitHub Repository Browser</h1>
      <input
        type="text"
        placeholder="Enter a GitHub username"
        value={username}
        onChange={handleUsernameChange}
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Home;
