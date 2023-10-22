import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function UserRepositories() {
  const { username } = useParams();
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the GitHub API using the username
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!Array.isArray(repositories)) {
    return <div>No repositories found for this user.</div>;
  }

  return (
    <div>
      <h2>Repositories for {username}</h2>
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
