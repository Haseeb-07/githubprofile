import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; 

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
    <div className="container">
      <h1>GitHub Repository Browser</h1>
      <p>Enter Github account name to check associated repositories</p>
      <input
        type="text"
        placeholder="Enter a GitHub username"
        value={username}
        onChange={handleUsernameChange}
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Home;
