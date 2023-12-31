import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './UserRepositories.css'; 

function UserRepositories() {
  const { username } = useParams();
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    fetch(`https://api.github.com/users/${username}/repos`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('User not found');
        }
      })
      .then((data) => {
        setRepositories(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [username]);

  if (loading) {
    return <div className="container">Loading Repositories for {username}...</div>;
  }

  if (error) {
    return <div className="container error">Error: {error}</div>;
  }

  if (!Array.isArray(repositories) || repositories.length === 0) {
    return <div className="container">No repositories found for this user.</div>;
  }

  return (
    <div className="container">
      <h2>Repositories for: {username}</h2>
      <ul>
        {repositories.map((repo) => (
          <li key={repo.id}>
            <strong>{repo.name}</strong> - {repo.description} ({repo.stargazers_count} stars)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserRepositories;
